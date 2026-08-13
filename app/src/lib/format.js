export function formatKRW(n) {
  return `${Math.round(n).toLocaleString("ko-KR")}원`;
}
