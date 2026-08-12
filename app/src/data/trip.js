export const TRIP_META = {
  range: "2026.09.19 — 09.26",
  nights: "8박",
  people: "2인",
  title: "LA 여행 (최종)",
  route: "🎬 LA → 🌄 Grand Canyon → 🌵 Sedona → ☀️ Phoenix",
  startDate: "2026-09-19",
  endDate: "2026-09-26",
};

export const DAYS = [
  {
    key: "d1",
    tab: "Day 1",
    date: "9.19(토)",
    title: "🌴 LA 도착",
    concept: "LAX 도착 → 인앤아웃 점심 → 호텔 체크인 → Venice Beach → Santa Monica → 생일 저녁",
    budget: "약 25만원 (Meat On Ocean 포함)",
    reservations: [{ label: "Meat On Ocean", detail: "18:30 · 2명 · 생일/창가 요청완료", paid: false }],
    items: [
      { t: "09:40", icon: "🛬", title: "LAX 도착", note: "입국심사 → 수하물 → 렌터카", tip: "입국심사 밀릴 수 있음, 여유있게 생각하기", place: null },
      { t: "12:30", icon: "🍔", title: "In-N-Out 점심", note: "LAX 근처", tip: "저녁이 스테이크니 적당히만 먹기", place: "In-N-Out Burger LAX" },
      { t: "14:00", icon: "🏨", title: "Aventura Hotel 체크인", note: "짐 정리, 휴식", tip: "이후 이동은 Uber/택시, 렌터카는 호텔에 주차", place: "Aventura Hotel Los Angeles" },
      { t: "16:20", icon: "🌊", title: "Venice Beach", note: "Muscle Beach, Skate Park", tip: null, place: "Venice Beach Boardwalk" },
      { t: "17:30", icon: "🎡", title: "Santa Monica Pier", note: "Route 66 종점 표지판", tip: "식당 예약 15분 전 도착 목표로 역산해서 출발", place: "Santa Monica Pier" },
      { t: "18:30", icon: "🥩", title: "Meat On Ocean (생일 저녁)", note: "예약자 Sehee Son", tip: "디저트는 꼭 주문하고 초 요청하기. 창가는 확정 보장 아님", place: "Meat On Ocean Santa Monica" },
    ],
  },
  {
    key: "d2",
    tab: "Day 2",
    date: "9.20(일)",
    title: "🎬 LA 시내 & 쇼핑",
    concept: "Pink Wall → Madhappy+Aritzia → Beverly Hills → Rodeo Dr(Alo) → Erewhon → Hollywood → Griffith 야경",
    budget: "약 15만원 (식비 기준, 쇼핑 별도)",
    reservations: [],
    items: [
      { t: "09:00", icon: "☕", title: "브런치", note: "Elephante 등", tip: null, place: null },
      { t: "10:30", icon: "💗", title: "Pink Wall", note: "짧게 사진만", tip: "오전 방문 추천, 오후엔 사람 많음", place: "Paul Smith Pink Wall Melrose" },
      { t: "10:50", icon: "🛍️", title: "Madhappy + Aritzia", note: "멜로즈 애비뉴", tip: null, place: "Madhappy Melrose Ave" },
      { t: "11:30", icon: "🏙️", title: "Beverly Hills", note: "사인, 야자수 거리", tip: null, place: "Beverly Hills Sign" },
      { t: "12:00", icon: "🛍️", title: "Rodeo Drive + Alo Yoga", note: "명품거리", tip: null, place: "Rodeo Drive Beverly Hills" },
      { t: "13:00", icon: "🥤", title: "Erewhon 스무디", note: "테이크아웃만", tip: "식사는 브런치로 충분, 스무디만 가볍게", place: "Erewhon Beverly Hills" },
      { t: "15:00", icon: "🎬", title: "Hollywood", note: "Walk of Fame", tip: "배고프면 Ovation Hollywood 안에서 해결(CPK, Chicken Guy! 등)", place: "TCL Chinese Theatre Hollywood" },
      { t: "18:00", icon: "🌇", title: "Griffith Observatory", note: "⭐ 오늘의 하이라이트", tip: "노을~야경 19:00~20:30이 베스트, 무조건 사수할 것", place: "Griffith Observatory" },
    ],
  },
  {
    key: "d3",
    tab: "Day 3",
    date: "9.21(월)",
    title: "🎢 유니버셜 스튜디오",
    concept: "오픈런 → Super Nintendo World → Studio Tour → 해리포터 → 저녁",
    budget: "약 15만원 (익스프레스 패스 별도 결제완료)",
    reservations: [{ label: "Universal Express Pass", detail: "9/21 · 2명 · 한국 여행사 구매", paid: true, amount: "628,051원" }],
    items: [
      { t: "07:00", icon: "🍩", title: "CityWalk 아침", note: "Voodoo Doughnut", tip: "산 음식 파크 안 반입 가능", place: "Universal CityWalk Hollywood" },
      { t: "08:00", icon: "🎮", title: "Super Nintendo World", note: "Mario Kart 먼저", tip: "Early Access 활용하면 줄 없이 탈 수 있음", place: "Universal Studios Hollywood" },
      { t: "—", icon: "🎥", title: "Studio Tour", note: "할리우드점 오리지널, 약 1시간", tip: null, place: null },
      { t: "—", icon: "🪄", title: "해리포터 월드", note: "버터비어", tip: null, place: null },
      { t: "저녁", icon: "🌃", title: "저녁", note: "CityWalk 또는 밖(Musso & Frank)", tip: "다음날 장거리 운전, 너무 늦게까지 있지 않기", place: "Musso & Frank Grill" },
    ],
  },
  {
    key: "d4",
    tab: "Day 4",
    date: "9.22(화)",
    title: "🚗 LA → 그랜드캐년",
    concept: "이른 출발 → Route66 셀리그먼 → 사우스림 일몰 → El Tovar 저녁",
    budget: "약 30만원 (El Tovar 저녁 포함)",
    reservations: [
      { label: "El Tovar Dining Room", detail: "19:00 · 2명", paid: false, confirmed: true },
      { label: "Kachina Lodge", detail: "9.22~9.23 · 1박", paid: false },
    ],
    items: [
      { t: "06:00", icon: "🚗", title: "LA 출발", note: "늦어도 07:00 전 필수", tip: "이거 늦으면 하루 전체가 밀림, 알람 여러개 맞추기", place: null },
      { t: "12:00", icon: "🍔", title: "Seligman 점심", note: "Snow Cap 또는 Westside Lilo's", tip: "당근케이크 유명(Lilo's)", place: "Delgadillo's Snow Cap Drive-In Seligman" },
      { t: "15:00", icon: "🏨", title: "Kachina Lodge 체크인", note: "El Tovar 프론트에서 체크인", tip: "Kachina엔 식당 없음, El Tovar/Harvey House 도보 이용", place: "Kachina Lodge Grand Canyon" },
      { t: "15:30", icon: "🌅", title: "일몰 감상", note: "⭐ Yavapai Point 추천", tip: "밤에 급격히 추워짐, 겉옷 필수. 엘크 발정기라 30m 이상 거리두기", place: "Yavapai Point Grand Canyon" },
      { t: "19:00", icon: "🥩", title: "El Tovar 저녁", note: "예약완료", tip: "Elk Bolognese(특색있음) or Filet Mignon(무난)", place: "El Tovar Hotel Grand Canyon" },
    ],
  },
  {
    key: "d5",
    tab: "Day 5",
    date: "9.23(수)",
    title: "📸 앤텔로프캐년",
    concept: "일출 → 이른 출발 → Antelope Canyon 투어 → Horseshoe Bend → Flagstaff",
    budget: "약 25만원 (투어 별도 결제완료)",
    reservations: [
      { label: "Antelope Canyon Tour", detail: "12:40~14:00 · 2명", paid: true, amount: "$316.54 (약 45만원)" },
      { label: "Little America Hotel", detail: "9.23~9.24 · Flagstaff", paid: false },
    ],
    items: [
      { t: "06:00", icon: "🌅", title: "그랜드캐년 일출", note: "", tip: null, place: null },
      { t: "06:30", icon: "🍳", title: "Harvey House 아침", note: "06:30 오픈", tip: "테이크아웃 가능, 시간 없으면 포장", place: "Harvey House Cafe Grand Canyon" },
      { t: "07:30", icon: "🚗", title: "Page 방향 출발", note: "약 2.5시간", tip: "늦어도 07:30, 이보다 늦으면 투어 지각 위험", place: null },
      { t: "12:10", icon: "📸", title: "Antelope Canyon 투어 집결", note: "체크인 마감 12:20", tip: "⚠️ 가방·삼각대·셀카봉 전면 금지! 물병만 손에 들고 가능", place: "Adventurous Antelope Canyon Tours Page AZ" },
      { t: "14:15", icon: "🍽️", title: "점심(브런치겸)", note: "Ranch House Grille / Big John's BBQ", tip: null, place: "Ranch House Grille Page AZ" },
      { t: "—", icon: "🌉", title: "Horseshoe Bend", note: "", tip: "⚠️ 가드레일 거의 없음, 가장자리 가까이 가지 않기, 사진 찍을때 특히 주의", place: "Horseshoe Bend Page AZ" },
      { t: "저녁", icon: "🌆", title: "Flagstaff 이동&저녁", note: "Bigfoot BBQ / Atria / Fat Olives", tip: null, place: "Downtown Flagstaff" },
    ],
  },
  {
    key: "d6",
    tab: "Day 6",
    date: "9.24(목)",
    title: "🌵 세도나 → 피닉스",
    concept: "Bell Rock→Airport Mesa→Tlaquepaque → Phoenix 이동 → 법인장님 저녁",
    budget: "약 20만원 (법인장님 저녁 별도)",
    reservations: [
      { label: "법인장님 저녁", detail: "19:00 · Chandler · 4명", paid: false },
      { label: "Airbnb", detail: "9.24~9.26 · Scottsdale · 2박", paid: false },
    ],
    items: [
      { t: "08:00", icon: "🚗", title: "Flagstaff 출발", note: "세도나까지 30~40분", tip: null, place: null },
      { t: "08:30", icon: "🔔", title: "Bell Rock", note: "아침 일찍 방문", tip: "덜 붐빌 때 사진 찍기 좋음", place: "Bell Rock Sedona" },
      { t: "09:30", icon: "🛬", title: "Airport Mesa", note: "360도 전망", tip: null, place: "Airport Mesa Sedona" },
      { t: "10:30", icon: "🛍️", title: "Tlaquepaque", note: "쇼핑+점심(Rene's/El Rincon)", tip: null, place: "Tlaquepaque Arts and Shopping Village" },
      { t: "14:00", icon: "🚗", title: "Phoenix로 출발", note: "약 2시간", tip: null, place: null },
      { t: "16:00", icon: "🏠", title: "Airbnb 체크인", note: "", tip: "체크인 코드 미리 확인해두기", place: "Scottsdale Airbnb" },
      { t: "19:00", icon: "🥩", title: "법인장님 저녁", note: "Chandler, 캐주얼톤", tip: null, place: "Chandler AZ restaurants" },
    ],
  },
  {
    key: "d7",
    tab: "Day 7",
    date: "9.25(금)",
    title: "☀️ 피닉스 쇼핑의 날",
    concept: "Desert Botanical Garden → 온종일 쇼핑 → 저녁은 자유",
    budget: "약 15만원 (정원 입장료 별도 결제완료, 쇼핑비 별도)",
    reservations: [{ label: "Desert Botanical Garden", detail: "08:00 · 2명", paid: true, amount: "$39.90 (약 5.7만원)" }],
    items: [
      { t: "08:00", icon: "🌵", title: "Desert Botanical Garden", note: "+Hole-in-the-Rock(무료)", tip: "더위 피해서 아침 방문, 물/선크림/모자 필수", place: "Desert Botanical Garden Phoenix" },
      { t: "11:00", icon: "🎣", title: "Bass Pro Shops", note: "Mesa Riverview", tip: null, place: "Bass Pro Shops Mesa Riverview" },
      { t: "14:30", icon: "🛍️", title: "Fashion Square", note: "SKIMS, Common Hype, North Face Outlet", tip: null, place: "Scottsdale Fashion Square" },
      { t: "—", icon: "🏙️", title: "Old Town Scottsdale", note: "Prickly Pear Candy 구매", tip: "Shades of the West, 재고 전화확인 추천", place: "Old Town Scottsdale" },
      { t: "—", icon: "🎯", title: "Target", note: "Touchland", tip: null, place: "Target Scottsdale Talking Stick Way" },
      { t: "—", icon: "🛒", title: "Trader Joe's", note: "프레첼·커피빈·무화과크래커", tip: null, place: "Trader Joe's Scottsdale" },
      { t: "18:30", icon: "🍔", title: "저녁 자유시간", note: "In-N-Out 포장 or 숙소 휴식", tip: "다음날 새벽 출발, 무리하지 않기", place: null },
    ],
  },
  {
    key: "d8",
    tab: "Day 8",
    date: "9.26(토)",
    title: "✈️ 귀국",
    concept: "새벽 출발 → 렌터카 반납 → PHX 06:15",
    budget: "약 3만원 (공항 간단 식사)",
    reservations: [],
    items: [
      { t: "새벽", icon: "🧳", title: "숙소 출발", note: "전날 밤 짐 정리 필수", tip: null, place: null },
      { t: "—", icon: "🚙", title: "렌터카 반납", note: "연료 확인", tip: null, place: "Phoenix Sky Harbor Airport Car Rental Return" },
      { t: "06:15", icon: "✈️", title: "PHX 출발", note: "", tip: "여권·지갑·항공권·충전기 최종 확인", place: "Phoenix Sky Harbor International Airport" },
    ],
  },
];

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
export const krw = (usd) => `약 ${Math.round(usd * RATE).toLocaleString("ko-KR")}원`;

export const SHOP_GIFTS = [
  { name: "Prickly Pear Candy", note: "팀원 40명용 낱개싱글즈 2케이스(60개) + 엄마·아빠·동생용 8oz박스 각 1개", usdEach: "박스당 $10.95", usd: 32.85, where: "Old Town Scottsdale, Shades of the West", init: "PP", color: "#e8623c" },
  { name: "Touchland 손소독제", note: "팀원 6 + 본인 1 + 동생 1 + 필라테스쌤 1 + 여유분 1 = 10개", usdEach: "개당 $9~10", usd: 95, where: "Target Scottsdale", init: "TL", color: "#3d6fb0" },
  { name: "Trader Joe's 간식", note: "초코프레첼 대용량 4 + 미니 5, 커피빈 3, 무화과크래커 2", usdEach: "개당 $2.49~4.49", usd: 47.86, where: "Trader Joe's Scottsdale", init: "TJ", color: "#1e8f5f" },
];
export const SHOP_WISH = [
  { name: "SKIMS", note: "이너웨어·라운지웨어, 한국 매장 없음", usdEach: "$38~98", usd: 68, where: "Scottsdale Fashion Square", init: "SK", color: "#241c33" },
  { name: "Aritzia", note: "미니멀 컨템포러리", usdEach: "$60~250", usd: 150, where: "Day 2 멜로즈 (8100 Melrose Ave)", init: "AR", color: "#c94a28" },
  { name: "Alo Yoga", note: "애슬레저", usdEach: "$68~128", usd: 98, where: "Day 2 로데오 드라이브", init: "AY", color: "#6e6480" },
  { name: "Common Hype", note: "한정판 스니커(조던, 예즈 등)", usdEach: "$150~500+", usd: 300, where: "Scottsdale Fashion Square 2층", init: "CH", color: "#e7a339" },
  { name: "The North Face Outlet", note: "아웃도어 아울렛 할인", usdEach: "$35~130", usd: 80, where: "Scottsdale Fashion Square", init: "TNF", color: "#5b3e86" },
  { name: "Madhappy", note: "스트릿 캐주얼", usdEach: "$150~200", usd: 175, where: "Day 2 멜로즈", init: "MH", color: "#1e8f5f" },
];

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
