-- LA 여행 플래너 — Supabase 스키마
-- Supabase 대시보드 SQL Editor에서 이 파일 전체를 한 번 실행하세요.

create extension if not exists "pgcrypto";

-- ============ 일정 아이템 상태 (완료 체크 + 메모) ============
create table if not exists item_state (
  day_key text not null,
  item_index int not null,
  done boolean not null default false,
  note text not null default '',
  updated_at timestamptz not null default now(),
  primary key (day_key, item_index)
);

-- ============ 코디(날짜별 옷) ============
create table if not exists outfit_items (
  id uuid primary key default gen_random_uuid(),
  day_key text not null,
  text text not null,
  checked boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============ 쇼핑 리스트 (자유 입력 + 사진) ============
create table if not exists shopping_items (
  id uuid primary key default gen_random_uuid(),
  list text not null default 'wish', -- 'gift' | 'wish' (자유 텍스트)
  title text not null,
  note text not null default '',
  price_text text not null default '', -- 예전 자유 입력 가격 (레거시, 신규 아이템은 아래 구조화된 필드 사용)
  price_usd numeric,
  quantity int not null default 1,
  store text not null default '',
  image_url text,
  checked boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table shopping_items add column if not exists price_usd numeric;
alter table shopping_items add column if not exists quantity int not null default 1;
alter table shopping_items add column if not exists store text not null default '';

-- ============ 앱 설정 (환율 등 키-값) ============
create table if not exists app_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
insert into app_settings (key, value) values ('exchange_rate', '1417') on conflict (key) do nothing;

-- ============ 일정 (관리자만 쓰기) ============
create table if not exists schedule_days (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  tab text not null,
  date text not null,
  title text not null,
  concept text not null default '',
  budget text not null default '',
  weather text not null default '',
  hotel_name text,
  hotel_note text,
  sort_order int not null default 0
);

create table if not exists schedule_items (
  id uuid primary key default gen_random_uuid(),
  day_id uuid not null references schedule_days(id) on delete cascade,
  t text not null default '',
  icon text not null default '',
  title text not null,
  note text not null default '',
  tip text,
  place text,
  lat double precision,
  lng double precision,
  move text, -- 이동수단: 도보/지하철/버스/트램/기차/택시/항공/자전거 (선택)
  sort_order int not null default 0
);
alter table schedule_items add column if not exists move text;

-- ============ RLS ============
alter table item_state enable row level security;
alter table outfit_items enable row level security;
alter table shopping_items enable row level security;
alter table schedule_days enable row level security;
alter table schedule_items enable row level security;
alter table app_settings enable row level security;

-- 관리자(admin@la-trip.local) 계정인지 확인하는 헬퍼
create or replace function is_admin() returns boolean as $$
  select (auth.jwt() ->> 'email') = 'admin@la-trip.local';
$$ language sql stable;

-- 메모/코디/쇼핑: 로그인한 사람(관리자 또는 뷰어 계정)이면 누구나 읽고 쓸 수 있음
drop policy if exists "public rw item_state" on item_state;
drop policy if exists "auth rw item_state" on item_state;
create policy "auth rw item_state" on item_state for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public rw outfit_items" on outfit_items;
drop policy if exists "auth rw outfit_items" on outfit_items;
create policy "auth rw outfit_items" on outfit_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public rw shopping_items" on shopping_items;
drop policy if exists "auth rw shopping_items" on shopping_items;
create policy "auth rw shopping_items" on shopping_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "auth rw app_settings" on app_settings;
create policy "auth rw app_settings" on app_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- 일정: 읽기는 로그인한 사람 누구나, 쓰기(추가/수정/삭제)는 관리자 계정만
drop policy if exists "public read schedule_days" on schedule_days;
drop policy if exists "auth read schedule_days" on schedule_days;
create policy "auth read schedule_days" on schedule_days for select using (auth.role() = 'authenticated');
drop policy if exists "admin insert schedule_days" on schedule_days;
create policy "admin insert schedule_days" on schedule_days for insert with check (is_admin());
drop policy if exists "admin update schedule_days" on schedule_days;
create policy "admin update schedule_days" on schedule_days for update using (is_admin());
drop policy if exists "admin delete schedule_days" on schedule_days;
create policy "admin delete schedule_days" on schedule_days for delete using (is_admin());

drop policy if exists "public read schedule_items" on schedule_items;
drop policy if exists "auth read schedule_items" on schedule_items;
create policy "auth read schedule_items" on schedule_items for select using (auth.role() = 'authenticated');
drop policy if exists "admin insert schedule_items" on schedule_items;
create policy "admin insert schedule_items" on schedule_items for insert with check (is_admin());
drop policy if exists "admin update schedule_items" on schedule_items;
create policy "admin update schedule_items" on schedule_items for update using (is_admin());
drop policy if exists "admin delete schedule_items" on schedule_items;
create policy "admin delete schedule_items" on schedule_items for delete using (is_admin());

-- ============ Storage: 쇼핑 사진 버킷 ============
insert into storage.buckets (id, name, public)
values ('shopping-photos', 'shopping-photos', true)
on conflict (id) do nothing;

drop policy if exists "public read shopping photos" on storage.objects;
create policy "public read shopping photos" on storage.objects
  for select using (bucket_id = 'shopping-photos');

drop policy if exists "public upload shopping photos" on storage.objects;
drop policy if exists "auth upload shopping photos" on storage.objects;
create policy "auth upload shopping photos" on storage.objects
  for insert with check (bucket_id = 'shopping-photos' and auth.role() = 'authenticated');

drop policy if exists "public delete shopping photos" on storage.objects;
drop policy if exists "auth delete shopping photos" on storage.objects;
create policy "auth delete shopping photos" on storage.objects
  for delete using (bucket_id = 'shopping-photos' and auth.role() = 'authenticated');
