# jinmolijangdan
학습공동체를 위한 깃허브 레포지토리

## 실행

회원가입/로그인 정보를 프로젝트 파일에 저장하려면 기본 `python -m http.server` 대신 아래 서버를 사용합니다.

```powershell
python server.py 8000
```

접속 주소:

```text
http://localhost:8000
```

회원 정보와 로그인 기록은 로컬 파일 `data/users.json`에 저장됩니다.
