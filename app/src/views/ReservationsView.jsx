import { RES_PAID, RES_CONFIRMED, RES_PENDING } from "../data/trip";
import ResCard from "../components/ResCard";

export default function ReservationsView() {
  return (
    <div className="px-4 pb-2 pt-4">
      <a
        href="/예약내역.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-surface p-3.5 shadow-card"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-[18px] text-white">
          📄
        </div>
        <div>
          <b className="block text-[13.5px]">예약내역 PDF 열기</b>
          <span className="text-[11.5px] text-muted">숙소·레스토랑·투어 전체 요약본</span>
        </div>
      </a>

      <div className="mb-2 ml-0.5 text-[11px] font-bold uppercase tracking-wider text-secondary">✅ 결제 완료</div>
      {RES_PAID.map((r, i) => (
        <ResCard key={i} status="paid" label={r.label} when={r.when} detail={r.detail} amount={r.amount} />
      ))}

      <div className="mb-2 ml-0.5 mt-4 text-[11px] font-bold uppercase tracking-wider text-secondary">
        📌 확정 예약 (결제 없음/현장)
      </div>
      {RES_CONFIRMED.map((r, i) => (
        <ResCard key={i} status="confirmed" label={r.label} when={r.when} detail={r.detail} />
      ))}

      <div className="mb-2 ml-0.5 mt-4 text-[11px] font-bold uppercase tracking-wider text-secondary">
        🕓 아직 정해야 할 것
      </div>
      {RES_PENDING.map((r, i) => (
        <ResCard key={i} status="pending" label={r.label} when={r.when} detail={r.detail} />
      ))}
    </div>
  );
}
