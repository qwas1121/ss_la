export const TRIP_META = {
  range: "2026.09.19 — 09.26",
  nights: "8박",
  people: "2인",
  title: "LA 여행 (최종)",
  route: "🎬 LA → 🌄 Grand Canyon → 🌵 Sedona → ☀️ Phoenix",
  startDate: "2026-09-19",
  endDate: "2026-09-26",
};

// 참고: 실제 일정(제목/컨셉/시간표/장소)은 Supabase의 schedule_days · schedule_items
// 테이블로 옮겨졌어요. 초기 데이터는 supabase/seed.sql, 이후 수정은 관리자 로그인 후
// 앱(일정 탭)에서 직접 하면 됩니다.

// 일정 탭의 날짜별 "확정 예약" 카드 (예약 탭의 RES_* 와는 별개 — 일부 겹칠 수 있음)
export const DAY_RESERVATIONS = {
  d1: [{ label: "Meat On Ocean", detail: "18:30 · 2명 · 생일/창가 요청완료", paid: false }],
  d2: [],
  d3: [{ label: "Universal Express Pass", detail: "9/21 · 2명 · 한국 여행사 구매", paid: true, amount: "628,051원" }],
  d4: [{ label: "El Tovar Dining Room", detail: "19:00 · 2명", paid: false, confirmed: true }],
  d5: [{ label: "Antelope Canyon Tour", detail: "12:40~14:00 · 2명", paid: true, amount: "$316.54 (약 45만원)" }],
  d6: [{ label: "법인장님 저녁", detail: "19:00 · Chandler · 4명", paid: false }],
  d7: [{ label: "Desert Botanical Garden", detail: "08:00 · 2명", paid: true, amount: "$39.90 (약 5.7만원)" }],
  d8: [],
};

export const RES_PAID = [
  { label: "Universal Express Pass", when: "Day 3 · 9.21", amount: "628,051원", detail: "2명 · 한국 여행사(마이리얼트립) 구매, 바우처 현장교환" },
  { label: "Antelope Canyon Tour", when: "Day 5 · 9.23", amount: "$316.54 (약 448,000원)", detail: "12:40~14:00 · Adventurous Antelope Canyon Tours" },
  { label: "Desert Botanical Garden", when: "Day 7 · 9.25", amount: "$39.90 (약 56,500원)", detail: "08:00 입장 · 2명" },
];
export const RES_CONFIRMED = [
  { label: "El Tovar Dining Room", when: "Day 4 · 9.22", detail: "19:00 · 2명 · 예약만 완료, 현장결제" },
  { label: "Meat On Ocean", when: "Day 1 · 9.19", detail: "18:30 · 2명 · 생일/창가 요청 전달됨" },
];
export const RES_PENDING = [
  { label: "법인장님 저녁 식당", when: "Day 6 · 9.24", detail: "Cheddar's / Oregano's / Craft 64 중 최종 미정" },
  { label: "Flagstaff 저녁", when: "Day 5 · 9.23", detail: "Bigfoot BBQ / Atria / Fat Olives 중 미정" },
];

export const RATE = 1417; // 1 USD 기준 원화, 환율 바뀌면 이 숫자만 수정

export const BUDGET = [
  { label: "전체 식비 (8일치, 2인)", amount: "약 137만원", value: 1370000, paid: false },
  { label: "법인장님 저녁 (4명분)", amount: "약 12만원", value: 120000, paid: false },
  { label: "Trader Joe's 간식·선물", amount: "약 6.8만원", value: 68000, paid: false },
  { label: "Prickly Pear Candy", amount: "약 10만원", value: 100000, paid: false },
  { label: "Touchland (10개)", amount: "약 13만원", value: 130000, paid: false },
  { label: "Universal Express Pass", amount: "628,051원", value: 628051, paid: true },
  { label: "Antelope Canyon Tour", amount: "약 44.9만원", value: 449000, paid: true },
  { label: "Desert Botanical Garden", amount: "약 5.7만원", value: 57000, paid: true },
];

export const BUDGET_TOTAL_LABEL = "약 287만원";
export const BUDGET_NOTE =
  "💱 환율 1,417원 기준 추정치예요. 정확한 원화는 노션 \"환율\" 페이지에서 실시간으로 확인하세요.\n쇼핑(SKIMS, Aritzia 등 개인 구매)은 별도 예산으로 챙기세요.";

export const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsEmbedUrl = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

/* ============ 정보 탭 ============ */
export const CONNECTIVITY_NOTE = "현지 eSIM 사전 설치 · 국제 로밍은 백업용으로만 설정해두기";

export const EMERGENCY_CONTACTS = [
  { label: "주LA 대한민국 총영사관", value: "+1-213-385-9300" },
  { label: "영사콜센터 (24시간)", value: "+82-2-3210-0404" },
  { label: "현지 긴급 (경찰·구급)", value: "911" },
];
export const EMERGENCY_NOTE = "출발 전 최신 연락처로 한 번 더 확인하세요.";

/* ============ 코디 탭 ============ */
export const WEATHER_NOTE = "9월 평년 기후 기준 참고용 수치예요. 실제 예보는 출발 1주일 전쯤 다시 확인하세요.";

export const PACKING_LIST = [
  "여권 · ESTA 승인 확인",
  "국제운전면허증",
  "여행자보험 서류",
  "충전기 · 멀티어댑터",
  "선크림 · 선글라스",
  "eSIM QR / 유심",
];
