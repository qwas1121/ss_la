-- 자동 생성된 초기 데이터 (트립 데이터 기반). schema.sql 실행 후 이 파일을 실행하세요.

-- ============ 일정 ============
insert into schedule_days (key, tab, date, title, concept, budget, weather, hotel_name, hotel_note, sort_order)
values ('d1', 'Day 1', '9.19(토)', '🌴 LA 도착', 'LAX 도착 → 인앤아웃 점심 → 호텔 체크인 → Venice Beach → Santa Monica → 생일 저녁', '약 25만원 (Meat On Ocean 포함)', '낮 27°C · 밤 18°C · 대체로 맑음', 'Aventura Hotel Los Angeles', '체크인 14:00 · 짐 정리, 휴식', 0)
on conflict (key) do nothing;

insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '09:40', '🛬', 'LAX 도착', '입국심사 → 수하물 → 렌터카', '입국심사 밀릴 수 있음, 여유있게 생각하기', null, null, null, 0
from schedule_days where key = 'd1';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '12:30', '🍔', 'In-N-Out 점심', 'LAX 근처', '저녁이 스테이크니 적당히만 먹기', 'In-N-Out Burger LAX', 33.95371, -118.39678, 1
from schedule_days where key = 'd1';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '14:00', '🏨', 'Aventura Hotel 체크인', '짐 정리, 휴식', '이후 이동은 Uber/택시, 렌터카는 호텔에 주차', 'Aventura Hotel Los Angeles', null, null, 2
from schedule_days where key = 'd1';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '16:20', '🌊', 'Venice Beach', 'Muscle Beach, Skate Park', null, 'Venice Beach Boardwalk', 33.98671, -118.4741, 3
from schedule_days where key = 'd1';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '17:30', '🎡', 'Santa Monica Pier', 'Route 66 종점 표지판', '식당 예약 15분 전 도착 목표로 역산해서 출발', 'Santa Monica Pier', 34.0089, -118.4974, 4
from schedule_days where key = 'd1';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '18:30', '🥩', 'Meat On Ocean (생일 저녁)', '예약자 Sehee Son', '디저트는 꼭 주문하고 초 요청하기. 창가는 확정 보장 아님', 'Meat On Ocean Santa Monica', 34.01275, -118.49615, 5
from schedule_days where key = 'd1';

insert into schedule_days (key, tab, date, title, concept, budget, weather, hotel_name, hotel_note, sort_order)
values ('d2', 'Day 2', '9.20(일)', '🎬 LA 시내 & 쇼핑', 'Pink Wall → Madhappy+Aritzia → Beverly Hills → Rodeo Dr(Alo) → Erewhon → Hollywood → Griffith 야경', '약 15만원 (식비 기준, 쇼핑 별도)', '낮 28°C · 밤 18°C · 대체로 맑음, 자외선 강함', null, null, 1)
on conflict (key) do nothing;

insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '09:00', '☕', '브런치', 'Elephante 등', null, null, null, null, 0
from schedule_days where key = 'd2';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '10:30', '💗', 'Pink Wall', '짧게 사진만', '오전 방문 추천, 오후엔 사람 많음', 'Paul Smith Pink Wall Melrose', 34.08394, -118.36876, 1
from schedule_days where key = 'd2';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '10:50', '🛍️', 'Madhappy + Aritzia', '멜로즈 애비뉴', null, 'Madhappy Melrose Ave', 34.08386, -118.36001, 2
from schedule_days where key = 'd2';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '11:30', '🏙️', 'Beverly Hills', '사인, 야자수 거리', null, 'Beverly Hills Sign', 34.07241, -118.40352, 3
from schedule_days where key = 'd2';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '12:00', '🛍️', 'Rodeo Drive + Alo Yoga', '명품거리', null, 'Rodeo Drive Beverly Hills', 34.06761, -118.40145, 4
from schedule_days where key = 'd2';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '13:00', '🥤', 'Erewhon 스무디', '테이크아웃만', '식사는 브런치로 충분, 스무디만 가볍게', 'Erewhon Beverly Hills', 34.06911, -118.40136, 5
from schedule_days where key = 'd2';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '15:00', '🎬', 'Hollywood', 'Walk of Fame', '배고프면 Ovation Hollywood 안에서 해결(CPK, Chicken Guy! 등)', 'TCL Chinese Theatre Hollywood', 34.10207, -118.34095, 6
from schedule_days where key = 'd2';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '18:00', '🌇', 'Griffith Observatory', '⭐ 오늘의 하이라이트', '노을~야경 19:00~20:30이 베스트, 무조건 사수할 것', 'Griffith Observatory', 34.11822, -118.30029, 7
from schedule_days where key = 'd2';

insert into schedule_days (key, tab, date, title, concept, budget, weather, hotel_name, hotel_note, sort_order)
values ('d3', 'Day 3', '9.21(월)', '🎢 유니버셜 스튜디오', '오픈런 → Super Nintendo World → Studio Tour → 해리포터 → 저녁', '약 15만원 (익스프레스 패스 별도 결제완료)', '낮 28°C · 밤 18°C · 대체로 맑음, 놀이기구 위주면 활동성 좋은 신발', null, null, 2)
on conflict (key) do nothing;

insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '07:00', '🍩', 'CityWalk 아침', 'Voodoo Doughnut', '산 음식 파크 안 반입 가능', 'Universal CityWalk Hollywood', 34.13631, -118.35486, 0
from schedule_days where key = 'd3';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '08:00', '🎮', 'Super Nintendo World', 'Mario Kart 먼저', 'Early Access 활용하면 줄 없이 탈 수 있음', 'Universal Studios Hollywood', 34.13923, -118.35438, 1
from schedule_days where key = 'd3';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '—', '🎥', 'Studio Tour', '할리우드점 오리지널, 약 1시간', null, null, null, null, 2
from schedule_days where key = 'd3';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '—', '🪄', '해리포터 월드', '버터비어', null, null, null, null, 3
from schedule_days where key = 'd3';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '저녁', '🌃', '저녁', 'CityWalk 또는 밖(Musso & Frank)', '다음날 장거리 운전, 너무 늦게까지 있지 않기', 'Musso & Frank Grill', 34.10176, -118.3353, 4
from schedule_days where key = 'd3';

insert into schedule_days (key, tab, date, title, concept, budget, weather, hotel_name, hotel_note, sort_order)
values ('d4', 'Day 4', '9.22(화)', '🚗 LA → 그랜드캐년', '이른 출발 → Route66 셀리그먼 → 사우스림 일몰 → El Tovar 저녁', '약 30만원 (El Tovar 저녁 포함)', 'LA 낮 27°C, 그랜드캐년 밤 8°C 내외 · 저녁부터 급격히 추워짐, 겉옷 필수', 'Kachina Lodge', '9.22~9.23 · 1박 · El Tovar 프론트에서 체크인', 3)
on conflict (key) do nothing;

insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '06:00', '🚗', 'LA 출발', '늦어도 07:00 전 필수', '이거 늦으면 하루 전체가 밀림, 알람 여러개 맞추기', null, null, null, 0
from schedule_days where key = 'd4';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '12:00', '🍔', 'Seligman 점심', 'Snow Cap 또는 Westside Lilo''s', '당근케이크 유명(Lilo''s)', 'Delgadillo''s Snow Cap Drive-In Seligman', 35.32543, -112.85082, 1
from schedule_days where key = 'd4';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '15:00', '🏨', 'Kachina Lodge 체크인', 'El Tovar 프론트에서 체크인', 'Kachina엔 식당 없음, El Tovar/Harvey House 도보 이용', 'Kachina Lodge Grand Canyon', 36.05709, -112.13855, 2
from schedule_days where key = 'd4';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '15:30', '🌅', '일몰 감상', '⭐ Yavapai Point 추천', '밤에 급격히 추워짐, 겉옷 필수. 엘크 발정기라 30m 이상 거리두기', 'Yavapai Point Grand Canyon', 36.06606, -112.11763, 3
from schedule_days where key = 'd4';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '19:00', '🥩', 'El Tovar 저녁', '예약완료', 'Elk Bolognese(특색있음) or Filet Mignon(무난)', 'El Tovar Hotel Grand Canyon', 36.05744, -112.13762, 4
from schedule_days where key = 'd4';

insert into schedule_days (key, tab, date, title, concept, budget, weather, hotel_name, hotel_note, sort_order)
values ('d5', 'Day 5', '9.23(수)', '📸 앤텔로프캐년', '일출 → 이른 출발 → Antelope Canyon 투어 → Horseshoe Bend → Flagstaff', '약 25만원 (투어 별도 결제완료)', '그랜드캐년 아침 7°C, Page 낮 33°C · 일교차·기온차 큼, 겹쳐입기 추천', 'Little America Hotel', '9.23~9.24 · Flagstaff', 4)
on conflict (key) do nothing;

insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '06:00', '🌅', '그랜드캐년 일출', '', null, null, null, null, 0
from schedule_days where key = 'd5';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '06:30', '🍳', 'Harvey House 아침', '06:30 오픈', '테이크아웃 가능, 시간 없으면 포장', 'Harvey House Cafe Grand Canyon', 36.05701, -112.14084, 1
from schedule_days where key = 'd5';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '07:30', '🚗', 'Page 방향 출발', '약 2.5시간', '늦어도 07:30, 이보다 늦으면 투어 지각 위험', null, null, null, 2
from schedule_days where key = 'd5';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '12:10', '📸', 'Antelope Canyon 투어 집결', '체크인 마감 12:20', '⚠️ 가방·삼각대·셀카봉 전면 금지! 물병만 손에 들고 가능', 'Adventurous Antelope Canyon Tours Page AZ', 36.91796, -111.45951, 3
from schedule_days where key = 'd5';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '14:15', '🍽️', '점심(브런치겸)', 'Ranch House Grille / Big John''s BBQ', null, 'Ranch House Grille Page AZ', 36.92053, -111.45805, 4
from schedule_days where key = 'd5';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '—', '🌉', 'Horseshoe Bend', '', '⚠️ 가드레일 거의 없음, 가장자리 가까이 가지 않기, 사진 찍을때 특히 주의', 'Horseshoe Bend Page AZ', 36.88045, -111.51613, 5
from schedule_days where key = 'd5';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '저녁', '🌆', 'Flagstaff 이동&저녁', 'Bigfoot BBQ / Atria / Fat Olives', null, 'Downtown Flagstaff', 35.20167, -111.64708, 6
from schedule_days where key = 'd5';

insert into schedule_days (key, tab, date, title, concept, budget, weather, hotel_name, hotel_note, sort_order)
values ('d6', 'Day 6', '9.24(목)', '🌵 세도나 → 피닉스', 'Bell Rock→Airport Mesa→Tlaquepaque → Phoenix 이동 → 법인장님 저녁', '약 20만원 (법인장님 저녁 별도)', '세도나 낮 29°C, 피닉스 낮 38°C · 오후로 갈수록 더워짐, 저녁 자리는 캐주얼톤', 'Airbnb (Scottsdale)', '9.24~9.26 · 2박 · 체크인 코드 미리 확인', 5)
on conflict (key) do nothing;

insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '08:00', '🚗', 'Flagstaff 출발', '세도나까지 30~40분', null, null, null, null, 0
from schedule_days where key = 'd6';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '08:30', '🔔', 'Bell Rock', '아침 일찍 방문', '덜 붐빌 때 사진 찍기 좋음', 'Bell Rock Sedona', 34.83838, -111.77868, 1
from schedule_days where key = 'd6';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '09:30', '🛬', 'Airport Mesa', '360도 전망', null, 'Airport Mesa Sedona', 34.8558, -111.77912, 2
from schedule_days where key = 'd6';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '10:30', '🛍️', 'Tlaquepaque', '쇼핑+점심(Rene''s/El Rincon)', null, 'Tlaquepaque Arts and Shopping Village', 34.86198, -111.76281, 3
from schedule_days where key = 'd6';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '14:00', '🚗', 'Phoenix로 출발', '약 2시간', null, null, null, null, 4
from schedule_days where key = 'd6';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '16:00', '🏠', 'Airbnb 체크인', '', '체크인 코드 미리 확인해두기', 'Scottsdale Airbnb', 33.49422, -111.92602, 5
from schedule_days where key = 'd6';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '19:00', '🥩', '법인장님 저녁', 'Chandler, 캐주얼톤', null, 'Chandler AZ restaurants', null, null, 6
from schedule_days where key = 'd6';

insert into schedule_days (key, tab, date, title, concept, budget, weather, hotel_name, hotel_note, sort_order)
values ('d7', 'Day 7', '9.25(금)', '☀️ 피닉스 쇼핑의 날', 'Desert Botanical Garden → 온종일 쇼핑 → 저녁은 자유', '약 15만원 (정원 입장료 별도 결제완료, 쇼핑비 별도)', '낮 38°C · 밤 26°C · 매우 더움, 자외선 강함 · 아침 야외활동엔 얇은 긴팔도 고려', null, null, 6)
on conflict (key) do nothing;

insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '08:00', '🌵', 'Desert Botanical Garden', '+Hole-in-the-Rock(무료)', '더위 피해서 아침 방문, 물/선크림/모자 필수', 'Desert Botanical Garden Phoenix', 33.46127, -111.94508, 0
from schedule_days where key = 'd7';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '11:00', '🎣', 'Bass Pro Shops', 'Mesa Riverview', null, 'Bass Pro Shops Mesa Riverview', 33.4367, -111.86644, 1
from schedule_days where key = 'd7';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '14:30', '🛍️', 'Fashion Square', 'SKIMS, Common Hype, North Face Outlet', null, 'Scottsdale Fashion Square', 33.50294, -111.9294, 2
from schedule_days where key = 'd7';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '—', '🏙️', 'Old Town Scottsdale', 'Prickly Pear Candy 구매', 'Shades of the West, 재고 전화확인 추천', 'Old Town Scottsdale', 33.49953, -111.91169, 3
from schedule_days where key = 'd7';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '—', '🎯', 'Target', 'Touchland', null, 'Target Scottsdale Talking Stick Way', 33.54058, -111.88701, 4
from schedule_days where key = 'd7';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '—', '🛒', 'Trader Joe''s', '프레첼·커피빈·무화과크래커', null, 'Trader Joe''s Scottsdale', 33.63592, -111.91718, 5
from schedule_days where key = 'd7';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '18:30', '🍔', '저녁 자유시간', 'In-N-Out 포장 or 숙소 휴식', '다음날 새벽 출발, 무리하지 않기', null, null, null, 6
from schedule_days where key = 'd7';

insert into schedule_days (key, tab, date, title, concept, budget, weather, hotel_name, hotel_note, sort_order)
values ('d8', 'Day 8', '9.26(토)', '✈️ 귀국', '새벽 출발 → 렌터카 반납 → PHX 06:15', '약 3만원 (공항 간단 식사)', '낮 36°C 내외 · 새벽 이동은 선선함, 기내는 쌀쌀할 수 있어 겉옷 하나', null, null, 7)
on conflict (key) do nothing;

insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '새벽', '🧳', '숙소 출발', '전날 밤 짐 정리 필수', null, null, null, null, 0
from schedule_days where key = 'd8';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '—', '🚙', '렌터카 반납', '연료 확인', null, 'Phoenix Sky Harbor Airport Car Rental Return', 33.43038, -112.04557, 1
from schedule_days where key = 'd8';
insert into schedule_items (day_id, t, icon, title, note, tip, place, lat, lng, sort_order)
select id, '06:15', '✈️', 'PHX 출발', '', '여권·지갑·항공권·충전기 최종 확인', 'Phoenix Sky Harbor International Airport', 33.43285, -112.00679, 2
from schedule_days where key = 'd8';

-- ============ 쇼핑 (선물) ============
insert into shopping_items (list, title, note, price_text, sort_order)
values ('gift', 'Prickly Pear Candy', '팀원 40명용 낱개싱글즈 2케이스(60개) + 엄마·아빠·동생용 8oz박스 각 1개', '박스당 $10.95 (총 약 46,548원) · Old Town Scottsdale, Shades of the West', 0);
insert into shopping_items (list, title, note, price_text, sort_order)
values ('gift', 'Touchland 손소독제', '팀원 6 + 본인 1 + 동생 1 + 필라테스쌤 1 + 여유분 1 = 10개', '개당 $9~10 (총 약 134,615원) · Target Scottsdale', 1);
insert into shopping_items (list, title, note, price_text, sort_order)
values ('gift', 'Trader Joe''s 간식', '초코프레첼 대용량 4 + 미니 5, 커피빈 3, 무화과크래커 2', '개당 $2.49~4.49 (총 약 67,818원) · Trader Joe''s Scottsdale', 2);

-- ============ 쇼핑 (위시리스트) ============
insert into shopping_items (list, title, note, price_text, sort_order)
values ('wish', 'SKIMS', '이너웨어·라운지웨어, 한국 매장 없음', '$38~98 (총 약 96,356원) · Scottsdale Fashion Square', 0);
insert into shopping_items (list, title, note, price_text, sort_order)
values ('wish', 'Aritzia', '미니멀 컨템포러리', '$60~250 (총 약 212,550원) · Day 2 멜로즈 (8100 Melrose Ave)', 1);
insert into shopping_items (list, title, note, price_text, sort_order)
values ('wish', 'Alo Yoga', '애슬레저', '$68~128 (총 약 138,866원) · Day 2 로데오 드라이브', 2);
insert into shopping_items (list, title, note, price_text, sort_order)
values ('wish', 'Common Hype', '한정판 스니커(조던, 예즈 등)', '$150~500+ (총 약 425,100원) · Scottsdale Fashion Square 2층', 3);
insert into shopping_items (list, title, note, price_text, sort_order)
values ('wish', 'The North Face Outlet', '아웃도어 아울렛 할인', '$35~130 (총 약 113,360원) · Scottsdale Fashion Square', 4);
insert into shopping_items (list, title, note, price_text, sort_order)
values ('wish', 'Madhappy', '스트릿 캐주얼', '$150~200 (총 약 247,975원) · Day 2 멜로즈', 5);
