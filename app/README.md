# LA Road Trip Planner

2026.09.19 – 09.26 LA → Grand Canyon → Sedona → Phoenix 여행 플래너. Vite + React + Tailwind CSS + Supabase.

## Supabase 설정 (최초 1회, 필수)

일정/메모/코디/쇼핑 데이터가 이제 전부 [Supabase](https://supabase.com)(무료)에 저장돼요. 앱을 실행하기 전에:

1. [supabase.com](https://supabase.com)에서 무료 가입 → **New project** 생성 (리전 아무거나, DB 비밀번호는 따로 기억)
2. 프로젝트 대시보드 → **SQL Editor** → New query → [supabase/schema.sql](../supabase/schema.sql) 전체 내용을 붙여넣고 실행 (이미 한 번 실행했어도 다시 실행해도 안전해요 — 정책을 새로 갱신한 부분이 있어서 한 번 더 실행해주세요)
3. 같은 방법으로 [supabase/seed.sql](../supabase/seed.sql) 실행 (8일치 일정 + 쇼핑 초기 데이터가 들어감, 이미 실행했다면 생략)
4. 왼쪽 메뉴 **Authentication → Users → Add user**로 계정 **2개** 생성
   - **관리자 계정**: Email `admin@la-trip.local` (반드시 이 주소로 — 코드에 고정되어 있음), Password는 원하는 걸로
   - **뷰어 계정**: Email `user@la-trip.local` (역시 고정 주소), Password는 관리자와 다른 걸로 (같이 보는 사람한테 이 비번을 알려주면 돼요)
   - 둘 다 **Auto Confirm User** 체크 필수
5. 왼쪽 메뉴 **Project Settings → API**에서 `Project URL`과 `anon public`(또는 새 UI에서는 **Publishable key** 대신 **Legacy anon key**) 값을 복사
6. `app/.env.example`을 `app/.env.local`로 복사하고, 5번에서 복사한 값을 채워넣기

```bash
cp .env.example .env.local
# .env.local을 열어 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 채우기
```

이 설정 전에는 앱이 각 탭에 "Supabase 설정이 필요해요" 안내만 보여주고 크래시는 나지 않아요.

> ⚠️ **schema.sql이 바뀔 때마다 다시 실행해야 해요.** 최근에 일정 아이템에 `move`(이동수단) 컬럼이 추가됐어요 — 이 컬럼이 없으면 관리자 모드에서 일정을 추가/수정할 때 저장이 실패해요. `alter table ... add column if not exists ...` 형태라 몇 번을 다시 실행해도 안전하니, 저장이 안 될 땐 일단 schema.sql부터 다시 돌려보세요.

## 개발

```bash
npm install
npm run dev
```

## 배포 (Vercel)

이 저장소에서 React 프로젝트는 `app/` 하위 폴더에 있습니다. Vercel에서 새 프로젝트를 만들 때:

1. 이 GitHub 저장소를 import
2. **Root Directory**를 `app`으로 설정 (Framework Preset은 Vite로 자동 인식됨)
3. Build Command: `npm run build`, Output Directory: `dist` (기본값 그대로 두면 됨)
4. **Environment Variables**에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 추가 (위 Supabase 설정에서 얻은 값)
5. Deploy

## 권한 구조

앱 전체가 로그인해야 보여요 (예약 등 민감한 내용이 있어서). 계정은 2종류:

- **관리자** (`admin@la-trip.local` 비밀번호로 로그인): 전부 보기 + 일정(스케줄) 탭에서 ✏️ 수정 / 🗑️ 삭제 / + 일정 추가 가능
- **뷰어** (`user@la-trip.local` 비밀번호로 로그인): 전부 보기 + 메모·완료체크·코디·쇼핑리스트는 자유롭게 쓸 수 있지만, 일정 자체는 수정 불가 (수정 버튼이 아예 안 보임)

로그인 화면은 비밀번호 한 칸만 있고, 입력한 비밀번호가 관리자 것인지 뷰어 것인지 앱이 자동으로 구분해요 — 이메일을 따로 입력할 필요는 없어요.

이 구분은 화면(UI)뿐 아니라 DB의 RLS(Row Level Security) 정책으로도 강제돼요 — 뷰어 계정으로 로그인한 상태에서 일정 수정 API를 직접 호출해도 서버가 거부합니다. 로그인 자체를 안 한 상태로는 어떤 데이터도 읽거나 쓸 수 없어요.

## 데이터 구조

- 일정(날짜/시간표/장소/좌표): Supabase `schedule_days` / `schedule_items` 테이블 (관리자 로그인 후 앱에서 직접 수정)
- 완료 체크·메모: `item_state` 테이블
- 코디 체크리스트: `outfit_items` 테이블
- 쇼핑 리스트(사진 포함): `shopping_items` 테이블 + `shopping-photos` Storage 버킷
- 환율: `app_settings` 테이블 (key-value, 쇼핑 탭에서 자동으로 원화 환산에 사용)
- 예약/예산/비상연락처/준비물 등은 여전히 [src/data/trip.js](src/data/trip.js)의 정적 데이터예요 (이번 범위 밖 — 코드 번들 안에 그대로 들어있다는 뜻이라, 완전히 숨기려면 이것도 DB로 옮겨야 해요).

## 최근 추가한 기능 (J플래너에서 가져온 것들)

- **자동 지오코딩**: 관리자가 일정을 추가/수정할 때 장소를 입력하면 저장 시 자동으로 좌표를 찾아서 오버뷰 지도에 표시돼요 (전에는 관리자가 추가한 일정은 지도에 안 떴어요)
- **이동수단 뱃지**: 일정에 도보·지하철·버스·트램·기차·택시·항공·자전거 중 하나를 지정하면 카드에 뱃지로 표시돼요
- **캘린더(.ics) 내보내기**: 각 일정 카드의 "📅 캘린더" 버튼으로 그 일정만 캘린더 앱에 추가할 수 있어요 (30분 전 알림 포함)
- **오버뷰 지도 개선**: 완료 체크한 만큼 "지나온 경로"(진한 실선)와 "남은 경로"(회색 점선)를 구분해서 그리고, 지도 핀을 탭하면 일정 목록으로 이동해서 해당 카드가 잠깐 강조돼요
- **PWA 지원**: 홈 화면에 추가하면 앱처럼 실행돼요 (아이콘·스플래시 포함)

가져오지 않은 것(필요하면 나중에 추가 가능): 여러 여행 관리, 캐릭터 애니메이션, 인앱 알람/알림, 일정별 파일 첨부, JSON 내보내기·불러오기, 배경 사진 업로드.
