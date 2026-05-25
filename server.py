from __future__ import annotations

import hashlib
import json
import os
import secrets
import sys
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
USERS_FILE = DATA_DIR / "users.json"
PBKDF2_ITERATIONS = 210_000


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_store() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if not USERS_FILE.exists():
      USERS_FILE.write_text(
          json.dumps({"users": [], "loginEvents": []}, ensure_ascii=False, indent=2),
          encoding="utf-8",
      )

    try:
        data = json.loads(USERS_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        data = {"users": [], "loginEvents": []}

    if not isinstance(data.get("users"), list):
        data["users"] = []
    if not isinstance(data.get("loginEvents"), list):
        data["loginEvents"] = []
    return data


def save_store(data: dict) -> None:
    DATA_DIR.mkdir(exist_ok=True)
    tmp = USERS_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(USERS_FILE)


def public_user(user: dict) -> dict:
    return {
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "createdAt": user.get("createdAt"),
        "lastLoginAt": user.get("lastLoginAt"),
        "loginCount": user.get("loginCount", 0),
    }


def hash_password(password: str, salt: str | None = None) -> tuple[str, str]:
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        bytes.fromhex(salt),
        PBKDF2_ITERATIONS,
    ).hex()
    return salt, digest


def verify_password(password: str, user: dict) -> bool:
    salt = user.get("passwordSalt")
    expected = user.get("passwordHash")
    if not salt or not expected:
        return False
    _, digest = hash_password(password, salt)
    return secrets.compare_digest(digest, expected)


class AppHandler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/auth/signup":
            self.handle_signup()
            return
        if path == "/api/auth/login":
            self.handle_login()
            return
        self.send_error(HTTPStatus.NOT_FOUND, "API endpoint not found")

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0") or 0)
        raw = self.rfile.read(length).decode("utf-8") if length else "{}"
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return {}
        return data if isinstance(data, dict) else {}

    def send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def handle_signup(self) -> None:
        payload = self.read_json()
        name = str(payload.get("name", "")).strip()
        email = str(payload.get("email", "")).strip().lower()
        password = str(payload.get("password", ""))

        if len(name) < 2:
            self.send_json(400, {"message": "이름은 2자 이상 입력해 주세요."})
            return
        if "@" not in email:
            self.send_json(400, {"message": "올바른 이메일을 입력해 주세요."})
            return
        if len(password) < 6:
            self.send_json(400, {"message": "비밀번호는 6자 이상이어야 합니다."})
            return

        data = ensure_store()
        if any(user.get("email") == email for user in data["users"]):
            self.send_json(409, {"message": "이미 가입된 이메일입니다."})
            return

        salt, password_hash = hash_password(password)
        user = {
            "id": secrets.token_hex(8),
            "name": name,
            "email": email,
            "passwordSalt": salt,
            "passwordHash": password_hash,
            "createdAt": now_iso(),
            "lastLoginAt": None,
            "loginCount": 0,
        }
        data["users"].append(user)
        save_store(data)
        self.send_json(201, {"user": public_user(user)})

    def handle_login(self) -> None:
        payload = self.read_json()
        email = str(payload.get("email", "")).strip().lower()
        password = str(payload.get("password", ""))

        data = ensure_store()
        user = next((item for item in data["users"] if item.get("email") == email), None)
        success = bool(user and verify_password(password, user))
        event = {
            "email": email,
            "success": success,
            "loggedAt": now_iso(),
        }

        if not success:
            event["reason"] = "invalid_credentials"
            data["loginEvents"].append(event)
            data["loginEvents"] = data["loginEvents"][-500:]
            save_store(data)
            self.send_json(401, {"message": "이메일 또는 비밀번호가 올바르지 않습니다."})
            return

        user["lastLoginAt"] = now_iso()
        user["loginCount"] = int(user.get("loginCount", 0)) + 1
        event["name"] = user.get("name", "")
        data["loginEvents"].append(event)
        data["loginEvents"] = data["loginEvents"][-500:]
        save_store(data)
        self.send_json(200, {"user": public_user(user)})


def main() -> None:
    os.chdir(ROOT)
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = ThreadingHTTPServer(("", port), AppHandler)
    print(f"Serving at http://localhost:{port}")
    print(f"Auth data file: {USERS_FILE}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")


if __name__ == "__main__":
    main()
