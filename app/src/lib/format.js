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
