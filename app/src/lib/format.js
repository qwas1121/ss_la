export function formatKRW(n) {
  return `${Math.round(n).toLocaleString("ko-KR")}원`;
}

// "9.19(토)" + "2026" -> "2026-09-19"
export function dayDateISO(dateStr, year) {
  const m = /(\d{1,2})\.(\d{1,2})/.exec(dateStr || "");
  if (!m) return null;
  return `${year}-${String(m[1]).padStart(2, "0")}-${String(m[2]).padStart(2, "0")}`;
}

// 오늘 날짜를 로컬 기준 "YYYY-MM-DD"로
export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// "09:40" -> 580(자정 이후 분). "—"/"저녁"처럼 시각이 아닌 값은 null (정렬 기준에서 제외)
export function timeKey(t) {
  const m = /^(\d{1,2}):(\d{2})$/.exec((t || "").trim());
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

// 기존 items 배열에서, newTimeKey가 들어갈 위치(인덱스)를 찾음.
// 시각이 없는 항목("—" 등)은 건너뛰고, 시각이 있는 항목만 비교해서 끼워넣을 자리를 정함.
export function findTimeInsertIndex(items, newTimeKey) {
  if (newTimeKey == null) return items.length;
  for (let i = 0; i < items.length; i++) {
    const k = timeKey(items[i].t);
    if (k != null && k > newTimeKey) return i;
  }
  return items.length;
}
