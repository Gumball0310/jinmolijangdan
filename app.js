const popupSlider = {
  slides: Array.from(document.querySelectorAll('[data-slider-root="popup"] .slide')),
  index: 0,
  timer: null,
  playing: true,
};

const neisMealConfig = {
  key: '6133934439fd4c429ffb0cfcaf902bd9',
  officeCode: 'D10',
  schoolCode: '7240086',
};

const openAiChatConfig = {
  // 여기에 OpenAI API 키를 넣어주세요.
  // 예: 'sk-...'
  apiKey: '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',
  model: 'gpt-5.4-mini',
};

const siteKnowledgeBase = `
사이트 고정 지식:
- 공지사항 목록(news.html)
  1) 교육발전특구 연계, 청소년 AI 크리에이터랩 참가자 모집 (news-notice-1.html)
  2) 전국 중·고등학교 대상 SW·AI 경진대회 추가 모집 안내 (news-notice-2.html)
  3) 고등학생 대상 데이터 크리에이터 파이프라인 교육 안내 (news-notice-3.html)
  4) 2026년도 국제정보올림피아드 교육생 선발 및 추천 안내 (news-notice-4.html)
- 가정통신문 목록(news.html)
  1) 2026년 5월 공습 대비 민방위 훈련 계획 안내 (news-family-1.html)
  2) 다자녀가정 고등학교 입학축하금 지원 재안내 (news-family-2.html)
  3) 특수교육대상자 인권실태조사 온라인 조사 참여 안내 (news-family-3.html)
  4) 청소년 도박 예방교육 확대 및 가정 내 관심 제고 안내 (news-family-4.html)
- 학습자료실(learning-study.html): 국어/수학/영어/과학/사회/예술/체육/기술·가정 교과별 파일 목록 제공
- 정기시험 정답자료실(learning-exam.html): 1학기/2학기 정기시험 및 모의고사 정답/해설 파일 제공
- 소프트웨어학습방(learning-software.html): Python, 알고리즘, 데이터 처리, 웹 프로그래밍, 프로젝트 예제 파일 제공
`;

const authStorageKey = 'dwAuthUsersV1';
const authSessionKey = 'dwAuthCurrentUserV1';

const siteSearchPages = [
  'index.html',
  'about.html',
  'news.html',
  'news-notice-1.html',
  'news-notice-2.html',
  'news-notice-3.html',
  'news-notice-4.html',
  'news-family-1.html',
  'news-family-2.html',
  'news-family-3.html',
  'news-family-4.html',
  'students.html',
  'careers.html',
  'careers-admission.html',
  'careers-consultation.html',
  'teachers.html',
  'community.html',
  'learning.html',
  'learning-study.html',
  'learning-exam.html',
  'learning-software.html',
  'foundation.html',
  'gallery.html',
  'gallery-detail-1.html',
  'gallery-detail-2.html',
  'gallery-detail-3.html',
  'meal.html',
  'afterschool.html',
];

const commonFaqItems = [
  '오늘 급식 알려줘',
  '공지사항 보여줘',
  '가정통신문 확인',
  '진학자료 찾기',
  '학습자료 찾기',
  '오시는 길 알려줘',
];

const chatbotAllowedLinks = [
  { label: '급식 상세', href: 'meal.html', keywords: ['급식', '식단', '점심', '중식', '밥'] },
  { label: '공지사항', href: 'news.html', keywords: ['공지', '안내', '소식', '알림'] },
  { label: '가정통신문', href: 'news.html', keywords: ['가정통신문', '통신문', '학부모'] },
  { label: '진학/진로', href: 'careers.html', keywords: ['진학', '진로', '입시', '대학'] },
  { label: '진학자료실', href: 'careers-admission.html', keywords: ['진학자료', '입시자료', '자료실'] },
  { label: '진학상담실', href: 'careers-consultation.html', keywords: ['상담', '진학상담', '상담실'] },
  { label: '학습자료실', href: 'learning-study.html', keywords: ['학습자료', '교과', '자료'] },
  { label: '정기시험 정답자료실', href: 'learning-exam.html', keywords: ['시험', '정기시험', '정답', '해설'] },
  { label: '소프트웨어학습방', href: 'learning-software.html', keywords: ['소프트웨어', '코딩', 'python', '파이썬'] },
  { label: '오시는 길', href: 'about.html#map', keywords: ['오시는 길', '위치', '지도', '문의'] },
  { label: '학생마당', href: 'students.html', keywords: ['학생', '학생마당'] },
];

const chatbotPositionStorageKey = 'dwChatbotPanelPositionV1';

const calendarData = {
  '2026-05': [
    { day: 1, label: '노동절', detail: '노동절로 인한 휴일.' },
    { day: 4, label: '재량휴업일', detail: '학교 재량휴업일.' },
    { day: 5, label: '어린이날', detail: '어린이날 기념 휴일.' },
    { day: 7, label: '전국연합학력평가(3학년)', detail: '3학년 전국연합학력평가 실시.' },
    { day: 7, label: '사이언스캠프 1기', detail: '1, 2학년 대상 사이언스캠프.' },
    { day: 8, label: '재량휴업일', detail: '교내 재량휴업일.' },
    { day: 11, label: '1학기 인문학특강', detail: '작가 초청 인문학 특강.' },
    { day: 13, label: '민방위 공습대피 훈련', detail: '전교생 대상 대피 훈련.' },
    { day: 15, label: '체육한마당', detail: '학년별 체육대회 운영.' },
    { day: 18, label: '효행교육주간(~22)', detail: '효행교육주간 운영.' },
    { day: 18, label: '다문화교육주간(~22)', detail: '다문화교육주간 운영.' },
    { day: 24, label: '석가탄신일', detail: '석가탄신일 휴일.' },
    { day: 26, label: '학생과목선택 상담주간', detail: '1학기 학생과목선택 상담주간.' },
  ],
  '2026-06': [
    { day: 1, label: '기말고사 준비', detail: '기말고사 대비 학습주간.' },
    { day: 6, label: '현충일', detail: '현충일 추념.' },
    { day: 12, label: '진로특강', detail: '진로진학 특강 운영.' },
    { day: 19, label: '교내토론대회', detail: '학생 토론대회 본선.' },
    { day: 26, label: '1학기 마감', detail: '1학기 마감 및 평가 정리.' },
  ],
};

const monthOrder = ['2026-05', '2026-06'];
let currentMonthIndex = 0;
let activeDetail = null;

function showSlide(nextIndex) {
  popupSlider.slides.forEach((slide, idx) => {
    slide.classList.toggle('is-active', idx === nextIndex);
  });
  popupSlider.index = nextIndex;
}

function moveSlide(step) {
  const total = popupSlider.slides.length;
  const nextIndex = (popupSlider.index + step + total) % total;
  showSlide(nextIndex);
}

function toggleAutoplay() {
  popupSlider.playing = !popupSlider.playing;
  const toggleButton = document.querySelector('[data-slider="popup"][data-action="toggle"]');
  if (!toggleButton) {
    return;
  }
  toggleButton.textContent = popupSlider.playing ? '정지' : '재생';
  if (popupSlider.playing) {
    startAutoplay();
  } else if (popupSlider.timer) {
    clearInterval(popupSlider.timer);
    popupSlider.timer = null;
  }
}

function startAutoplay() {
  if (popupSlider.timer) {
    clearInterval(popupSlider.timer);
  }
  popupSlider.timer = setInterval(() => moveSlide(1), 5000);
}

function renderCalendar(monthKey) {
  const [year, month] = monthKey.split('-').map(Number);
  const title = document.getElementById('calendar-title');
  const grid = document.getElementById('calendar-grid');
  const detail = document.getElementById('schedule-detail');
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0).getDate();
  const startOffset = firstDate.getDay();
  const monthLabel = `${year}년 ${String(month).padStart(2, '0')}월`;

  title.textContent = monthLabel;
  grid.innerHTML = '';

  dayNames.forEach((day) => {
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = day;
    grid.appendChild(label);
  });

  for (let i = 0; i < startOffset; i += 1) {
    const empty = document.createElement('div');
    empty.className = 'day-cell is-empty';
    grid.appendChild(empty);
  }

  const events = calendarData[monthKey] || [];
  const eventMap = new Map();
  events.forEach((event) => {
    if (!eventMap.has(event.day)) {
      eventMap.set(event.day, []);
    }
    eventMap.get(event.day).push(event);
  });

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  for (let day = 1; day <= lastDate; day += 1) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'day-cell';
    cell.textContent = day;

    if (isCurrentMonth && today.getDate() === day) {
      cell.classList.add('is-today');
    }

    if (eventMap.has(day)) {
      cell.classList.add('has-event');
      cell.title = eventMap.get(day).map((event) => event.label).join(' / ');
      cell.addEventListener('click', () => {
        const event = eventMap.get(day)[0];
        activeDetail = event;
        detail.innerHTML = `<strong>${String(month).padStart(2, '0')}. ${String(day).padStart(2, '0')} ${event.label}</strong><p>${event.detail}</p>`;
      });
    }

    grid.appendChild(cell);
  }

  if (!activeDetail || !events.some((event) => event.day === activeDetail.day)) {
    const fallback = events.find((event) => event.day === 15) || events[0];
    if (fallback) {
      activeDetail = fallback;
      detail.innerHTML = `<strong>${String(month).padStart(2, '0')}. ${String(fallback.day).padStart(2, '0')} ${fallback.label}</strong><p>${fallback.detail}</p>`;
    }
  }
}

function switchMonth(step) {
  currentMonthIndex = (currentMonthIndex + step + monthOrder.length) % monthOrder.length;
  renderCalendar(monthOrder[currentMonthIndex]);
}

function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.tab-panel'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-selected', selected ? 'true' : 'false');
      });
      panels.forEach((panel) => {
        const active = panel.id === target;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    });
  });
}

function initSlider() {
  if (!popupSlider.slides.length) {
    return;
  }

  const prevButton = document.querySelector('[data-slider="popup"][data-action="prev"]');
  const nextButton = document.querySelector('[data-slider="popup"][data-action="next"]');
  const toggleButton = document.querySelector('[data-slider="popup"][data-action="toggle"]');
  if (!prevButton || !nextButton || !toggleButton) {
    return;
  }

  prevButton.addEventListener('click', () => moveSlide(-1));
  nextButton.addEventListener('click', () => moveSlide(1));
  toggleButton.addEventListener('click', toggleAutoplay);
  startAutoplay();
}

function initCalendar() {
  const prevButton = document.getElementById('prev-month');
  const nextButton = document.getElementById('next-month');
  const calendarGrid = document.getElementById('calendar-grid');
  if (!prevButton || !nextButton || !calendarGrid) {
    return;
  }

  prevButton.addEventListener('click', () => switchMonth(-1));
  nextButton.addEventListener('click', () => switchMonth(1));
  renderCalendar(monthOrder[currentMonthIndex]);
}

function formatYmd(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function formatDotDate(ymd) {
  return `${ymd.slice(0, 4)}.${ymd.slice(4, 6)}.${ymd.slice(6, 8)}`;
}

function getMonthRange(targetDate) {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return {
    from: formatYmd(start),
    to: formatYmd(end),
  };
}

function parseDishList(dishRaw) {
  return (dishRaw || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .split('\n')
    .map((item) => item.replace(/\s*\(([0-9.\s]+)\)\s*/g, '').trim())
    .filter(Boolean);
}

function normalizeMealRows(rows) {
  const mealByDate = new Map();

  rows.forEach((row) => {
    const ymd = row.MLSV_YMD;
    if (!ymd) {
      return;
    }

    const current = mealByDate.get(ymd);
    const candidate = {
      ymd,
      mealName: row.MMEAL_SC_NM || '중식',
      mealCode: row.MMEAL_SC_CODE || '',
      dishes: parseDishList(row.DDISH_NM),
    };

    if (!current || candidate.mealCode === '2') {
      mealByDate.set(ymd, candidate);
    }
  });

  return mealByDate;
}

async function fetchMealMap(fromYmd, toYmd) {
  const params = new URLSearchParams({
    KEY: neisMealConfig.key,
    Type: 'json',
    pIndex: '1',
    pSize: '200',
    ATPT_OFCDC_SC_CODE: neisMealConfig.officeCode,
    SD_SCHUL_CODE: neisMealConfig.schoolCode,
    MLSV_FROM_YMD: fromYmd,
    MLSV_TO_YMD: toYmd,
  });

  const response = await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Meal API request failed: ${response.status}`);
  }

  const data = await response.json();
  const payload = data.mealServiceDietInfo;
  if (!Array.isArray(payload) || payload.length < 2 || !Array.isArray(payload[1].row)) {
    return new Map();
  }

  return normalizeMealRows(payload[1].row);
}

function renderMealList(listElement, dishes) {
  listElement.innerHTML = '';
  dishes.forEach((dish) => {
    const item = document.createElement('li');
    item.textContent = dish;
    listElement.appendChild(item);
  });
}

async function initTodayMealCard() {
  const mealCard = document.getElementById('meal');
  if (!mealCard) {
    return;
  }

  const dateElement = mealCard.querySelector('.meal-date');
  const listElement = mealCard.querySelector('.meal-list');
  const moreLink = mealCard.querySelector('.section-head a');
  if (!dateElement || !listElement) {
    return;
  }

  if (moreLink) {
    moreLink.setAttribute('href', 'meal.html');
  }

  dateElement.textContent = '급식 정보를 불러오는 중...';
  listElement.innerHTML = '<li>급식 정보를 확인하고 있습니다.</li>';

  const today = new Date();
  const { from, to } = getMonthRange(today);
  const todayKey = formatYmd(today);

  try {
    const mealMap = await fetchMealMap(from, to);
    const todayMeal = mealMap.get(todayKey);
    dateElement.textContent = formatDotDate(todayKey);

    if (!todayMeal || !todayMeal.dishes.length) {
      listElement.innerHTML = '<li>오늘 등록된 급식 정보가 없습니다.</li>';
      return;
    }

    renderMealList(listElement, todayMeal.dishes);
  } catch (error) {
    dateElement.textContent = '급식 정보를 불러오지 못했습니다.';
    listElement.innerHTML = '<li>잠시 후 다시 확인해 주세요.</li>';
  }
}

function renderMealCalendarGrid(year, month, mealMap, onSelect) {
  const grid = document.getElementById('meal-calendar-grid');
  if (!grid) {
    return;
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0).getDate();
  const startOffset = firstDate.getDay();

  grid.innerHTML = '';

  dayNames.forEach((day) => {
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = day;
    grid.appendChild(label);
  });

  for (let i = 0; i < startOffset; i += 1) {
    const empty = document.createElement('div');
    empty.className = 'day-cell is-empty';
    grid.appendChild(empty);
  }

  for (let day = 1; day <= lastDate; day += 1) {
    const ymd = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
    const meal = mealMap.get(ymd);
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'day-cell';
    cell.textContent = day;

    if (meal) {
      cell.classList.add('has-event');
      cell.title = `${formatDotDate(ymd)} 급식 보기`;
      cell.addEventListener('click', () => onSelect(ymd, meal));
    }

    grid.appendChild(cell);
  }
}

function renderMealDayDetail(ymd, meal) {
  const dateElement = document.getElementById('meal-day-date');
  const titleElement = document.getElementById('meal-day-title');
  const listElement = document.getElementById('meal-day-list');
  if (!dateElement || !titleElement || !listElement) {
    return;
  }

  dateElement.textContent = formatDotDate(ymd);
  titleElement.textContent = `${meal.mealName} 식단`;

  if (!meal.dishes.length) {
    listElement.innerHTML = '<li>등록된 식단 정보가 없습니다.</li>';
    return;
  }

  renderMealList(listElement, meal.dishes);
}

async function initMealPage() {
  const mealPage = document.getElementById('meal-page');
  if (!mealPage) {
    return;
  }

  const prevButton = document.getElementById('meal-prev-month');
  const nextButton = document.getElementById('meal-next-month');
  const monthTitle = document.getElementById('meal-month-title');
  const statusElement = document.getElementById('meal-status');
  if (!prevButton || !nextButton || !monthTitle || !statusElement) {
    return;
  }

  let currentDate = new Date();

  const loadMonth = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const { from, to } = getMonthRange(currentDate);
    monthTitle.textContent = `${year}년 ${String(month).padStart(2, '0')}월 급식`;
    statusElement.textContent = '급식 정보를 불러오는 중...';

    try {
      const mealMap = await fetchMealMap(from, to);
      renderMealCalendarGrid(year, month, mealMap, renderMealDayDetail);

      const todayKey = formatYmd(new Date());
      const firstMeal = Array.from(mealMap.entries()).sort(([a], [b]) => a.localeCompare(b))[0];
      if (mealMap.has(todayKey) && todayKey.slice(0, 6) === `${year}${String(month).padStart(2, '0')}`) {
        renderMealDayDetail(todayKey, mealMap.get(todayKey));
      } else if (firstMeal) {
        renderMealDayDetail(firstMeal[0], firstMeal[1]);
      } else {
        renderMealDayDetail(formatYmd(currentDate), { mealName: '중식', dishes: [] });
      }

      statusElement.textContent = mealMap.size
        ? `총 ${mealMap.size}일의 급식 정보가 있습니다.`
        : '이 달에 등록된 급식 정보가 없습니다.';
    } catch (error) {
      statusElement.textContent = '급식 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
    }
  };

  prevButton.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    loadMonth();
  });

  nextButton.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    loadMonth();
  });

  await loadMonth();
}

function stripMarkdownBold(text) {
  return String(text || '').replace(/\*\*/g, '');
}

function normalizeChatbotLinks(links) {
  if (!Array.isArray(links)) {
    return [];
  }

  const allowedByHref = new Map(chatbotAllowedLinks.map((link) => [link.href, link]));
  const seen = new Set();
  return links
    .map((link) => allowedByHref.get(String(link?.href || '').trim()))
    .filter((link) => {
      if (!link || seen.has(link.href)) {
        return false;
      }
      seen.add(link.href);
      return true;
    });
}

function getFallbackChatbotLinks(...texts) {
  const haystack = texts.map((text) => String(text || '').toLowerCase()).join(' ');
  const matched = chatbotAllowedLinks.filter((link) => (
    link.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()))
  ));
  return matched.slice(0, 3);
}

function parseChatbotResponse(rawText, userText) {
  const cleaned = stripMarkdownBold(rawText)
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/i, '')
    .trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === 'object') {
      const answer = stripMarkdownBold(parsed.answer || '').trim() || cleaned;
      const links = normalizeChatbotLinks(parsed.links);
      return {
        answer,
        links: links.length ? links : getFallbackChatbotLinks(userText, answer),
      };
    }
  } catch (error) {
    // Fall back to plain-text handling below.
  }

  return {
    answer: cleaned,
    links: getFallbackChatbotLinks(userText, cleaned),
  };
}

function loadChatbotPosition() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(chatbotPositionStorageKey) || 'null');
    if (typeof saved?.left === 'number' && typeof saved?.top === 'number') {
      return saved;
    }
  } catch (error) {
    return null;
  }
  return null;
}

function saveChatbotPosition(position) {
  try {
    window.localStorage.setItem(chatbotPositionStorageKey, JSON.stringify(position));
  } catch (error) {
    console.warn('챗봇 위치를 저장하지 못했습니다.', error);
  }
}

function clampChatbotPosition(left, top, dialog) {
  const margin = 12;
  const width = dialog.offsetWidth || 720;
  const height = dialog.offsetHeight || 560;
  return {
    left: Math.min(Math.max(margin, left), Math.max(margin, window.innerWidth - width - margin)),
    top: Math.min(Math.max(margin, top), Math.max(margin, window.innerHeight - height - margin)),
  };
}

function appendChatMessage(chatBody, role, text, { links = [] } = {}) {
  const item = document.createElement('div');
  item.className = `chatbot-message-item ${role}`;

  const bubble = document.createElement('div');
  bubble.className = `chatbot-message ${role}`;
  bubble.textContent = stripMarkdownBold(text);
  item.appendChild(bubble);

  const safeLinks = normalizeChatbotLinks(links);
  if (role === 'bot' && safeLinks.length) {
    const links = document.createElement('div');
    links.className = 'chatbot-link-row';
    links.innerHTML = safeLinks
      .map((link) => `<a href="${link.href}" data-chatbot-link="true">${escapeHtml(link.label)}</a>`)
      .join('');
    item.appendChild(links);
  }

  chatBody.appendChild(item);
  chatBody.scrollTop = chatBody.scrollHeight;
  return bubble;
}

const chatbotStorageKey = 'dwChatbotStateV1';

function loadChatbotState() {
  try {
    const raw = window.localStorage.getItem(chatbotStorageKey);
    if (!raw) {
      return { isOpen: false, history: [], chatScrollTop: null };
    }
    const parsed = JSON.parse(raw);
    return {
      isOpen: Boolean(parsed?.isOpen),
      history: Array.isArray(parsed?.history) ? parsed.history : [],
      chatScrollTop: typeof parsed?.chatScrollTop === 'number' ? parsed.chatScrollTop : null,
    };
  } catch (error) {
    console.warn('챗봇 저장 데이터를 읽지 못했습니다.', error);
    return { isOpen: false, history: [], chatScrollTop: null };
  }
}

function saveChatbotState(state) {
  try {
    window.localStorage.setItem(chatbotStorageKey, JSON.stringify(state));
  } catch (error) {
    console.warn('챗봇 저장 데이터를 기록하지 못했습니다.', error);
  }
}

function loadLocalJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function saveLocalJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('저장소 기록 실패:', error);
  }
}

function getAuthUsers() {
  const users = loadLocalJson(authStorageKey, []);
  return Array.isArray(users) ? users : [];
}

function setAuthUsers(users) {
  saveLocalJson(authStorageKey, users);
}

function getCurrentUser() {
  const user = loadLocalJson(authSessionKey, null);
  if (!user || typeof user !== 'object') {
    return null;
  }
  if (typeof user.email !== 'string' || typeof user.name !== 'string') {
    return null;
  }
  return user;
}

function setCurrentUser(user) {
  if (!user) {
    window.localStorage.removeItem(authSessionKey);
    return;
  }
  saveLocalJson(authSessionKey, { name: user.name, email: user.email });
}

function normalizeSearchText(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSearchSnippet(text, terms) {
  const compact = String(text || '').replace(/\s+/g, ' ').trim();
  const lower = compact.toLowerCase();
  const firstHit = terms
    .map((term) => lower.indexOf(term))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  const start = Math.max(0, (firstHit || 0) - 45);
  const snippet = compact.slice(start, start + 130);
  return `${start > 0 ? '...' : ''}${snippet}${start + 130 < compact.length ? '...' : ''}`;
}

function getCurrentPageName() {
  const current = window.location.pathname.split('/').pop();
  return current || 'index.html';
}

async function loadSearchIndex() {
  const parser = new DOMParser();
  const currentPage = getCurrentPageName();

  const entries = await Promise.all(siteSearchPages.map(async (url) => {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      const doc = parser.parseFromString(html, 'text/html');
      doc.querySelectorAll('script, style, noscript, svg').forEach((node) => node.remove());

      const title = doc.querySelector('h1')?.textContent
        || doc.querySelector('title')?.textContent
        || url;
      const section = doc.querySelector('.main-nav .is-active')?.textContent
        || doc.querySelector('.hero-kicker')?.textContent
        || '사이트';
      const text = normalizeSearchText(doc.body?.textContent || '');

      return {
        url,
        title: title.trim(),
        section: section.trim(),
        text,
        snippetSource: doc.body?.textContent || '',
      };
    } catch (error) {
      if (url === currentPage) {
        return {
          url,
          title: document.querySelector('h1')?.textContent?.trim() || document.title || url,
          section: document.querySelector('.main-nav .is-active')?.textContent?.trim() || '현재 페이지',
          text: normalizeSearchText(document.body?.textContent || ''),
          snippetSource: document.body?.textContent || '',
        };
      }
      return null;
    }
  }));

  return entries.filter(Boolean);
}

async function searchSite(query) {
  const terms = normalizeSearchText(query)
    .split(' ')
    .filter(Boolean);

  if (!terms.length) {
    return [];
  }

  const entries = await loadSearchIndex();
  return entries
    .map((entry) => {
      const titleText = normalizeSearchText(entry.title);
      const score = terms.reduce((total, term) => {
        if (!entry.text.includes(term) && !titleText.includes(term)) {
          return total;
        }
        const titleScore = titleText.includes(term) ? 8 : 0;
        const bodyMatches = entry.text.split(term).length - 1;
        return total + titleScore + bodyMatches;
      }, 0);

      return {
        ...entry,
        score,
        snippet: getSearchSnippet(entry.snippetSource, terms),
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 12);
}

function ensureSearchModal() {
  let modal = document.getElementById('site-search-modal');
  if (modal) {
    return modal;
  }

  modal = document.createElement('section');
  modal.className = 'site-search-modal';
  modal.id = 'site-search-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <div class="site-search-dialog" role="dialog" aria-modal="true" aria-label="사이트 검색 결과">
      <header class="site-search-dialog-head">
        <strong>검색 결과</strong>
        <button type="button" class="site-search-close" aria-label="검색 닫기">닫기</button>
      </header>
      <div class="site-search-result-summary" id="site-search-result-summary"></div>
      <div class="site-search-results" id="site-search-results"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.site-search-close');
  closeButton?.addEventListener('click', () => {
    modal.hidden = true;
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.hidden = true;
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      modal.hidden = true;
    }
  });

  return modal;
}

function renderSearchResults(query, results, isLoading = false) {
  const modal = ensureSearchModal();
  const summary = modal.querySelector('#site-search-result-summary');
  const list = modal.querySelector('#site-search-results');

  modal.hidden = false;
  if (!summary || !list) {
    return;
  }

  if (isLoading) {
    summary.textContent = `"${query}" 검색 중입니다.`;
    list.innerHTML = '';
    return;
  }

  summary.textContent = results.length
    ? `"${query}" 검색 결과 ${results.length}건`
    : `"${query}" 검색 결과가 없습니다.`;

  list.innerHTML = results.length
    ? results.map((result) => `
        <a class="site-search-result" href="${result.url}">
          <span>${escapeHtml(result.section)}</span>
          <strong>${escapeHtml(result.title)}</strong>
          <p>${escapeHtml(result.snippet)}</p>
        </a>
      `).join('')
    : '<p class="site-search-empty">다른 검색어로 다시 검색해 주세요.</p>';
}

async function runSiteSearch(form, query) {
  const input = form.querySelector('input');
  const searchText = String(query || input?.value || '').trim();
  if (!searchText) {
    input?.focus();
    return;
  }

  if (input) {
    input.value = searchText;
  }

  renderSearchResults(searchText, [], true);
  const results = await searchSite(searchText);
  renderSearchResults(searchText, results);
}

function initSiteSearch() {
  const headerActions = document.querySelector('.header-actions');
  if (!headerActions || headerActions.querySelector('.site-assist-tools')) {
    return;
  }

  const tools = document.createElement('div');
  tools.className = 'site-assist-tools';

  const form = document.createElement('form');
  form.className = 'site-search-form';
  form.setAttribute('role', 'search');
  form.innerHTML = `
    <label class="sr-only" for="site-search-input">사이트 검색</label>
    <input id="site-search-input" name="q" type="search" placeholder="검색어 입력" autocomplete="off" />
    <button type="submit">검색</button>
  `;

  form.innerHTML = `
    <label class="sr-only" for="site-search-input">사이트 검색</label>
    <input id="site-search-input" name="q" type="search" placeholder="검색어 입력" autocomplete="off" />
    <button type="submit">검색</button>
  `;

  const faqList = document.createElement('div');
  faqList.className = 'site-search-faqs';
  faqList.setAttribute('aria-label', '자주묻는 질문');
  faqList.innerHTML = commonFaqItems
    .map((item) => `<button type="button" class="faq-chip" data-faq="${escapeHtml(item)}">${escapeHtml(item)}</button>`)
    .join('');

  const aiButton = document.createElement('button');
  aiButton.className = 'chatbot-fab';
  aiButton.id = 'chatbot-fab';
  aiButton.type = 'button';
  aiButton.setAttribute('aria-label', 'AI 상담 열기');
  aiButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.25a7.75 7.75 0 0 0-6.53 11.93l-.72 3.46 3.22-.95A7.75 7.75 0 1 0 12 3.25Zm-3.1 8.35a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm3.1 0a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm3.1 0a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Z"/>
    </svg>
    <span>AI 상담</span>
  `;
  tools.append(form, faqList, aiButton);

  const oldSearchButton = headerActions.querySelector('button.search-toggle');
  if (oldSearchButton) {
    oldSearchButton.replaceWith(tools);
  } else {
    const homeLink = Array.from(headerActions.querySelectorAll('a')).find((link) => link.textContent.trim() === '메인');
    headerActions.insertBefore(tools, homeLink || null);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await runSiteSearch(form);
  });

  faqList.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-faq]');
    if (!button) {
      return;
    }
    await runSiteSearch(form, button.dataset.faq);
  });
}

function initAuthUI() {
  const headerActions = document.querySelector('.header-actions');
  const body = document.body;
  if (!headerActions || !body) {
    return;
  }

  if (document.getElementById('auth-actions')) {
    return;
  }

  const actions = document.createElement('div');
  actions.className = 'auth-actions';
  actions.id = 'auth-actions';
  actions.innerHTML = `
    <span class="auth-user" id="auth-user" hidden></span>
    <button type="button" class="auth-btn" id="auth-login-open">로그인</button>
    <button type="button" class="auth-btn" id="auth-signup-open">회원가입</button>
    <button type="button" class="auth-btn" id="auth-logout" hidden>로그아웃</button>
  `;
  headerActions.appendChild(actions);

  const modal = document.createElement('section');
  modal.className = 'auth-modal';
  modal.id = 'auth-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <div class="auth-dialog" role="dialog" aria-modal="true" aria-label="로그인 및 회원가입">
      <header class="auth-dialog-header">
        <strong>회원 서비스</strong>
        <button type="button" class="auth-close" id="auth-close" aria-label="닫기">×</button>
      </header>
      <div class="auth-tabs">
        <button type="button" class="auth-tab is-active" id="auth-tab-login">로그인</button>
        <button type="button" class="auth-tab" id="auth-tab-signup">회원가입</button>
      </div>
      <div class="auth-panel" id="auth-login-panel">
        <form id="auth-login-form" class="auth-form">
          <label>이메일<input name="email" type="email" required /></label>
          <label>비밀번호<input name="password" type="password" minlength="6" required /></label>
          <button type="submit" class="auth-submit">로그인</button>
        </form>
      </div>
      <div class="auth-panel" id="auth-signup-panel" hidden>
        <form id="auth-signup-form" class="auth-form">
          <label>이름<input name="name" type="text" minlength="2" required /></label>
          <label>이메일<input name="email" type="email" required /></label>
          <label>비밀번호<input name="password" type="password" minlength="6" required /></label>
          <label>비밀번호 확인<input name="passwordConfirm" type="password" minlength="6" required /></label>
          <button type="submit" class="auth-submit">회원가입</button>
        </form>
      </div>
      <p class="auth-status" id="auth-status"></p>
    </div>
  `;
  body.appendChild(modal);

  const authUser = document.getElementById('auth-user');
  const loginOpen = document.getElementById('auth-login-open');
  const signupOpen = document.getElementById('auth-signup-open');
  const logoutButton = document.getElementById('auth-logout');
  const authClose = document.getElementById('auth-close');
  const tabLogin = document.getElementById('auth-tab-login');
  const tabSignup = document.getElementById('auth-tab-signup');
  const loginPanel = document.getElementById('auth-login-panel');
  const signupPanel = document.getElementById('auth-signup-panel');
  const loginForm = document.getElementById('auth-login-form');
  const signupForm = document.getElementById('auth-signup-form');
  const authStatus = document.getElementById('auth-status');

  if (!authUser || !loginOpen || !signupOpen || !logoutButton || !authClose
    || !tabLogin || !tabSignup || !loginPanel || !signupPanel || !loginForm || !signupForm || !authStatus) {
    return;
  }

  const setStatus = (text, isError = false) => {
    authStatus.textContent = text;
    authStatus.style.color = isError ? '#c62828' : '';
  };

  const setTab = (mode) => {
    const isLogin = mode === 'login';
    tabLogin.classList.toggle('is-active', isLogin);
    tabSignup.classList.toggle('is-active', !isLogin);
    loginPanel.hidden = !isLogin;
    signupPanel.hidden = isLogin;
    setStatus('');
  };

  const openModal = (mode) => {
    setTab(mode);
    modal.hidden = false;
  };

  const closeModal = () => {
    modal.hidden = true;
    setStatus('');
  };

  const renderAuthState = () => {
    const currentUser = getCurrentUser();
    const isLoggedIn = Boolean(currentUser);
    authUser.hidden = !isLoggedIn;
    logoutButton.hidden = !isLoggedIn;
    loginOpen.hidden = isLoggedIn;
    signupOpen.hidden = isLoggedIn;
    authUser.textContent = isLoggedIn ? `${currentUser.name}님` : '';
  };

  loginOpen.addEventListener('click', () => openModal('login'));
  signupOpen.addEventListener('click', () => openModal('signup'));
  authClose.addEventListener('click', closeModal);
  tabLogin.addEventListener('click', () => setTab('login'));
  tabSignup.addEventListener('click', () => setTab('signup'));
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  logoutButton.addEventListener('click', () => {
    setCurrentUser(null);
    renderAuthState();
    setStatus('로그아웃되었습니다.');
    setTimeout(() => setStatus(''), 1800);
  });

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim().toLowerCase();
    const password = String(formData.get('password') || '');
    const passwordConfirm = String(formData.get('passwordConfirm') || '');

    if (name.length < 2) {
      setStatus('이름은 2자 이상 입력해 주세요.', true);
      return;
    }
    if (!email || !email.includes('@')) {
      setStatus('올바른 이메일을 입력해 주세요.', true);
      return;
    }
    if (password.length < 6) {
      setStatus('비밀번호는 6자 이상이어야 합니다.', true);
      return;
    }
    if (password !== passwordConfirm) {
      setStatus('비밀번호 확인이 일치하지 않습니다.', true);
      return;
    }

    const users = getAuthUsers();
    if (users.some((user) => user.email === email)) {
      setStatus('이미 가입된 이메일입니다.', true);
      return;
    }

    users.push({
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    });
    setAuthUsers(users);
    setCurrentUser({ name, email });
    renderAuthState();
    signupForm.reset();
    closeModal();
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = String(formData.get('email') || '').trim().toLowerCase();
    const password = String(formData.get('password') || '');
    const users = getAuthUsers();
    const matched = users.find((user) => user.email === email && user.password === password);

    if (!matched) {
      setStatus('이메일 또는 비밀번호가 올바르지 않습니다.', true);
      return;
    }

    setCurrentUser({ name: matched.name, email: matched.email });
    renderAuthState();
    loginForm.reset();
    closeModal();
  });

  renderAuthState();
}

function isMealQuestion(text) {
  return /급식|식단|점심|중식|밥/.test(text);
}

function trimChatHistory(history, limit = 16) {
  if (history.length > limit) {
    history.splice(0, history.length - limit);
  }
}

async function getRealtimeChatContext(userText) {
  if (!isMealQuestion(userText)) {
    return '';
  }

  const today = new Date();
  const { from, to } = getMonthRange(today);
  const todayKey = formatYmd(today);

  try {
    const mealMap = await fetchMealMap(from, to);
    const todayMeal = mealMap.get(todayKey);
    const sortedEntries = Array.from(mealMap.entries()).sort(([a], [b]) => a.localeCompare(b));
    const monthMeals = sortedEntries
      .map(([ymd, meal]) => `- ${formatDotDate(ymd)} ${meal.mealName}: ${meal.dishes.join(', ') || '등록된 식단 없음'}`)
      .join('\n');

    const todaySummary = todayMeal
      ? `${formatDotDate(todayKey)} ${todayMeal.mealName}: ${todayMeal.dishes.join(', ') || '등록된 식단 없음'}`
      : `${formatDotDate(todayKey)}: 등록된 급식 정보 없음`;
    const lastMealDate = sortedEntries.length ? formatDotDate(sortedEntries[sortedEntries.length - 1][0]) : '없음';

    return `실시간 급식 데이터 참고:
오늘 급식: ${todaySummary}
이번 달 등록된 마지막 급식일: ${lastMealDate}
이번 달 전체 급식 목록:
${monthMeals || '- 등록된 급식 정보 없음'}
위 정보를 기반으로 특정 날짜 급식을 물으면 해당 날짜 식단을 직접 답해.`;
  } catch (error) {
    return '실시간 급식 데이터를 불러오지 못했습니다. 이 경우 사용자에게 잠시 후 다시 시도해 달라고 안내하세요.';
  }
}

function getDomKnowledgeContext() {
  const noticeLinks = Array.from(document.querySelectorAll('.post-list a'))
    .slice(0, 40)
    .map((link) => {
      const title = (link.querySelector('span')?.textContent || link.textContent || '').replace(/\s+/g, ' ').trim();
      const href = link.getAttribute('href') || '';
      return title ? `- ${title}${href ? ` (${href})` : ''}` : '';
    })
    .filter(Boolean);

  const fileLinks = Array.from(document.querySelectorAll('.file-list a'))
    .slice(0, 80)
    .map((link) => {
      const title = (link.textContent || '').replace(/\s+/g, ' ').trim();
      const href = link.getAttribute('href') || '';
      return title ? `- ${title}${href ? ` (${href})` : ''}` : '';
    })
    .filter(Boolean);

  if (!noticeLinks.length && !fileLinks.length) {
    return '';
  }

  const sections = [];
  if (noticeLinks.length) {
    sections.push(`현재 페이지 공지/게시글 목록:\n${noticeLinks.join('\n')}`);
  }
  if (fileLinks.length) {
    sections.push(`현재 페이지 파일 목록:\n${fileLinks.join('\n')}`);
  }
  return sections.join('\n');
}

async function requestChatCompletion(userText, chatHistory = []) {
  if (!openAiChatConfig.apiKey || openAiChatConfig.apiKey === 'YOUR_OPENAI_API_KEY_HERE') {
    throw new Error('API_KEY_MISSING');
  }

  const realtimeContext = await getRealtimeChatContext(userText);
  const domKnowledgeContext = getDomKnowledgeContext();
  const inputMessages = [
    {
      role: 'system',
      content: `너는 덕원고등학교 공식 웹사이트 전담 도우미 챗봇이다.

[핵심 원칙]
- 항상 존댓말로 답한다.
- 사용자가 원하는 정보를 직접 알려주고, 필요하면 경로를 덧붙인다.
- "직접 알려줄 수 있는 정보"를 단순히 찾아보라고 넘기지 않는다.
- 모르는 내용은 추측하지 말고 정중히 한계를 설명한다.
- 마크다운 볼드 문법과 별표 강조를 절대 사용하지 않는다.

[사이트 안내 범위]
- 학교소개(about.html), 덕원소식(news.html), 학생마당(students.html), 방과후학교(afterschool.html)
- 진학/진로(careers.html), 진학자료실(careers-admission.html), 진학상담실(careers-consultation.html)
- 교수학습도움센터(learning.html), 학습자료실(learning-study.html), 정기시험 정답자료실(learning-exam.html), 소프트웨어학습방(learning-software.html)
- 급식정보(meal.html), 교사마당(teachers.html), 열린마당(community.html)

[응답 방식]
JSON만 반환한다. 코드블록, 설명문, 마크다운을 붙이지 않는다.
형식: {"answer":"사용자에게 보여줄 일반 텍스트","links":[{"label":"버튼명","href":"허용된 href"}]}
answer는 질문의 직접 답을 1~3문장으로 제공한다.
links는 관련 페이지가 있을 때만 넣고, 없으면 빈 배열을 사용한다.
급식 질문은 가능한 범위에서 오늘/해당일 식단을 직접 알려주고 links에 meal.html을 넣는다.
허용 링크:
${chatbotAllowedLinks.map((link) => `- ${link.label}: ${link.href}`).join('\n')}`,
    },
    {
      role: 'system',
      content: `아래 사이트 지식과 목록 데이터를 활용해 공지사항 제목, 세부 목록, 파일명을 직접 답해.
${siteKnowledgeBase}
${domKnowledgeContext || '현재 페이지에서 추출된 추가 목록 없음'}`,
    },
  ];

  if (realtimeContext) {
    inputMessages.push({ role: 'system', content: realtimeContext });
  }

  inputMessages.push(...chatHistory);

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiChatConfig.apiKey}`,
    },
    body: JSON.stringify({
      model: openAiChatConfig.model,
      input: inputMessages,
    }),
  });

  if (!response.ok) {
    throw new Error(`API_ERROR_${response.status}`);
  }

  const data = await response.json();
  const text = data.output_text
    || data.output?.[0]?.content?.[0]?.text
    || '답변을 생성하지 못했습니다.';
  return parseChatbotResponse(text, userText);
}

function initChatbotWidget() {
  const body = document.body;
  if (!body) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'chatbot-widget';
  wrapper.innerHTML = `
    <button type="button" class="chatbot-fab" id="chatbot-fab" aria-label="AI 챗봇 열기">AI</button>
    <section class="chatbot-panel" id="chatbot-panel" aria-label="AI 챗봇" hidden>
      <header class="chatbot-header">
        <strong>AI 챗봇</strong>
        <button type="button" class="chatbot-close" id="chatbot-close" aria-label="챗봇 닫기">×</button>
      </header>
      <div class="chatbot-body" id="chatbot-body">
        <div class="chatbot-message bot">안녕하세요! 학교 홈페이지 이용을 도와드릴게요.</div>
      </div>
      <form class="chatbot-form" id="chatbot-form">
        <input id="chatbot-input" type="text" placeholder="질문을 입력하세요" autocomplete="off" />
        <button type="submit">전송</button>
      </form>
    </section>
  `;
  body.appendChild(wrapper);

  const fab = document.getElementById('chatbot-fab');
  const panel = document.getElementById('chatbot-panel');
  const closeButton = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const chatBody = document.getElementById('chatbot-body');

  if (!fab || !panel || !closeButton || !form || !input || !chatBody) {
    return;
  }

  const savedState = loadChatbotState();
  const chatHistory = Array.isArray(savedState.history)
    ? savedState.history
        .filter((entry) => entry && (entry.role === 'user' || entry.role === 'assistant') && typeof entry.content === 'string')
        .slice(-16)
    : [];

  chatBody.innerHTML = '';
  if (chatHistory.length) {
    chatHistory.forEach((entry) => {
      appendChatMessage(chatBody, entry.role === 'assistant' ? 'bot' : 'user', entry.content);
    });
  } else {
    appendChatMessage(chatBody, 'bot', '안녕하세요! 학교 홈페이지 이용을 도와드릴게요.');
  }

  const persistChatbotState = () => {
    saveChatbotState({
      isOpen: !panel.hidden,
      history: chatHistory.slice(-16),
      chatScrollTop: chatBody.scrollTop,
    });
  };

  const openPanel = ({ focusInput = true } = {}) => {
    panel.hidden = false;
    panel.classList.add('is-open');
    persistChatbotState();
    if (focusInput) {
      input.focus({ preventScroll: true });
    }
  };

  const closePanel = () => {
    panel.classList.remove('is-open');
    panel.hidden = true;
    persistChatbotState();
  };

  fab.addEventListener('click', () => {
    if (panel.hidden) {
      openPanel();
    } else {
      closePanel();
    }
  });

  closeButton.addEventListener('click', closePanel);
  chatBody.addEventListener('scroll', persistChatbotState);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
      return;
    }

    appendChatMessage(chatBody, 'user', text);
    chatHistory.push({ role: 'user', content: text });
    trimChatHistory(chatHistory);
    persistChatbotState();
    input.value = '';
    appendChatMessage(chatBody, 'bot', '답변을 생성 중입니다...');

    try {
      const answer = await requestChatCompletion(text, chatHistory);
      const pending = chatBody.querySelector('.chatbot-message.bot:last-child');
      if (pending) {
        pending.textContent = answer;
      }
      chatHistory.push({ role: 'assistant', content: answer });
      trimChatHistory(chatHistory);
      persistChatbotState();
    } catch (error) {
      const pending = chatBody.querySelector('.chatbot-message.bot:last-child');
      if (pending) {
        if (error.message === 'API_KEY_MISSING') {
          pending.textContent = 'app.js의 openAiChatConfig.apiKey에 OpenAI API 키를 입력해 주세요.';
        } else {
          pending.textContent = '요청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        }
      }
    }
  });

  if (savedState.isOpen) {
    openPanel({ focusInput: false });
  }
  if (typeof savedState.chatScrollTop === 'number') {
    chatBody.scrollTop = savedState.chatScrollTop;
  }
}

function initChatbotWidgetV2() {
  const body = document.body;
  if (!body) {
    return;
  }

  let fab = document.getElementById('chatbot-fab');
  if (!fab) {
    fab = document.createElement('button');
    fab.className = 'chatbot-fab chatbot-fab-fallback';
    fab.id = 'chatbot-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'AI 상담 열기');
    fab.innerHTML = '<span>AI 상담</span>';
    body.appendChild(fab);
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'chatbot-widget';
  wrapper.innerHTML = `
    <section class="chatbot-panel" id="chatbot-panel" aria-label="AI 상담" hidden>
      <div class="chatbot-dialog" role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
        <header class="chatbot-header">
          <div>
            <span class="chatbot-kicker">AI Assistant</span>
            <strong id="chatbot-title">AI 상담</strong>
          </div>
          <button type="button" class="chatbot-close" id="chatbot-close" aria-label="챗봇 닫기">닫기</button>
        </header>
        <div class="chatbot-body" id="chatbot-body"></div>
        <div class="chatbot-faqs" id="chatbot-faqs" aria-label="AI 자주묻는 질문">
          ${commonFaqItems.map((item) => `<button type="button" class="faq-chip" data-faq="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join('')}
        </div>
        <form class="chatbot-form" id="chatbot-form">
          <input id="chatbot-input" type="text" placeholder="질문을 입력하세요" autocomplete="off" />
          <button type="submit">전송</button>
        </form>
      </div>
    </section>
  `;
  body.appendChild(wrapper);

  const panel = document.getElementById('chatbot-panel');
  const dialog = panel?.querySelector('.chatbot-dialog');
  const header = panel?.querySelector('.chatbot-header');
  const closeButton = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const chatBody = document.getElementById('chatbot-body');
  const faqList = document.getElementById('chatbot-faqs');

  if (!fab || !panel || !dialog || !header || !closeButton || !form || !input || !chatBody || !faqList) {
    return;
  }

  const savedState = loadChatbotState();
  const chatHistory = Array.isArray(savedState.history)
    ? savedState.history
        .filter((entry) => entry && (entry.role === 'user' || entry.role === 'assistant') && typeof entry.content === 'string')
        .slice(-16)
    : [];

  chatBody.innerHTML = '';
  if (chatHistory.length) {
    chatHistory.forEach((entry) => {
      appendChatMessage(chatBody, entry.role === 'assistant' ? 'bot' : 'user', entry.content);
    });
  } else {
    appendChatMessage(chatBody, 'bot', '안녕하세요! 학교 홈페이지 이용을 도와드릴게요.');
  }

  const persistChatbotState = () => {
    saveChatbotState({
      isOpen: !panel.hidden,
      history: chatHistory.slice(-16),
      chatScrollTop: chatBody.scrollTop,
    });
  };

  const openPanel = ({ focusInput = true } = {}) => {
    panel.hidden = false;
    panel.classList.add('is-open');
    const searchModal = document.getElementById('site-search-modal');
    if (searchModal) {
      searchModal.hidden = true;
    }
    const savedPosition = loadChatbotPosition();
    if (savedPosition) {
      const nextPosition = clampChatbotPosition(savedPosition.left, savedPosition.top, dialog);
      dialog.style.left = `${nextPosition.left}px`;
      dialog.style.top = `${nextPosition.top}px`;
      dialog.classList.add('is-positioned');
    } else {
      dialog.style.left = '';
      dialog.style.top = '';
      dialog.classList.remove('is-positioned');
    }
    persistChatbotState();
    if (focusInput) {
      input.focus({ preventScroll: true });
    }
  };

  const closePanel = () => {
    panel.classList.remove('is-open');
    panel.hidden = true;
    persistChatbotState();
  };

  const sendChatMessage = async (text) => {
    const message = String(text || '').trim();
    if (!message) {
      input.focus();
      return;
    }

    openPanel({ focusInput: false });
    appendChatMessage(chatBody, 'user', message);
    chatHistory.push({ role: 'user', content: message });
    trimChatHistory(chatHistory);
    persistChatbotState();
    input.value = '';
    const pending = appendChatMessage(chatBody, 'bot', '답변을 생성 중입니다...');

    try {
      const result = await requestChatCompletion(message, chatHistory);
      pending.textContent = result.answer;
      const messageItem = pending.closest('.chatbot-message-item');
      const links = normalizeChatbotLinks(result.links);
      if (messageItem && links.length) {
        const linkRow = document.createElement('div');
        linkRow.className = 'chatbot-link-row';
        linkRow.innerHTML = links
          .map((link) => `<a href="${link.href}" data-chatbot-link="true">${escapeHtml(link.label)}</a>`)
          .join('');
        messageItem.appendChild(linkRow);
      }
      chatHistory.push({ role: 'assistant', content: result.answer });
      trimChatHistory(chatHistory);
      persistChatbotState();
    } catch (error) {
      pending.textContent = error.message === 'API_KEY_MISSING'
        ? 'app.js의 openAiChatConfig.apiKey에 OpenAI API 키를 입력해 주세요.'
        : '요청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    }
  };

  fab.addEventListener('click', () => {
    if (panel.hidden) {
      openPanel();
    } else {
      closePanel();
    }
  });

  closeButton.addEventListener('click', closePanel);
  header.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, a, input')) {
      return;
    }

    event.preventDefault();
    const rect = dialog.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = rect.left;
    const startTop = rect.top;
    header.setPointerCapture(event.pointerId);
    dialog.classList.add('is-positioned', 'is-dragging');
    dialog.style.left = `${startLeft}px`;
    dialog.style.top = `${startTop}px`;

    const moveDialog = (moveEvent) => {
      const next = clampChatbotPosition(
        startLeft + moveEvent.clientX - startX,
        startTop + moveEvent.clientY - startY,
        dialog,
      );
      dialog.style.left = `${next.left}px`;
      dialog.style.top = `${next.top}px`;
    };

    const stopDrag = () => {
      dialog.classList.remove('is-dragging');
      const next = clampChatbotPosition(
        parseFloat(dialog.style.left) || startLeft,
        parseFloat(dialog.style.top) || startTop,
        dialog,
      );
      dialog.style.left = `${next.left}px`;
      dialog.style.top = `${next.top}px`;
      saveChatbotPosition(next);
      header.removeEventListener('pointermove', moveDialog);
      header.removeEventListener('pointerup', stopDrag);
      header.removeEventListener('pointercancel', stopDrag);
    };

    header.addEventListener('pointermove', moveDialog);
    header.addEventListener('pointerup', stopDrag);
    header.addEventListener('pointercancel', stopDrag);
  });
  dialog.addEventListener('click', (event) => {
    const link = event.target.closest('[data-chatbot-link]');
    if (!link) {
      return;
    }
    saveChatbotState({
      isOpen: true,
      history: chatHistory.slice(-16),
      chatScrollTop: chatBody.scrollTop,
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      closePanel();
    }
  });
  chatBody.addEventListener('scroll', persistChatbotState);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await sendChatMessage(input.value);
  });

  faqList.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-faq]');
    if (!button) {
      return;
    }
    await sendChatMessage(button.dataset.faq);
  });

  if (savedState.isOpen) {
    openPanel({ focusInput: false });
  }
  if (typeof savedState.chatScrollTop === 'number') {
    chatBody.scrollTop = savedState.chatScrollTop;
  }
}

initTabs();
initSlider();
initCalendar();
initTodayMealCard();
initMealPage();
initSiteSearch();
initAuthUI();
initChatbotWidgetV2();
