import { RES_PAID, RES_CONFIRMED, RES_PENDING } from "../data/trip";
import ResCard from "../components/ResCard";

export default function ReservationsView() {
  return (
    <div className="flex flex-col gap-3.5 px-4 pb-2 pt-4">
      <a
        href="/예약내역.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="notch-lg flex items-center gap-3 border-2 border-ink bg-surface p-3.5"
      >
        <div className="notch-sm flex h-[38px] w-[38px] shrink-0 items-center justify-center border-2 border-ink bg-gold text-[16px]">
          📄
        </div>
        <div>
          <b className="text-[13px] font-bold text-ink">예약내역 PDF 열기</b>
          <div className="text-[11px] text-muted">숙소·레스토랑·투어 전체 요약본</div>
        </div>
      </a>

      <div>
        <div className="notch-sm font-display mb-2 inline-block border-2 border-ink bg-good-soft px-2.5 py-1 text-[12px] font-bold text-good-text">
          ✅ 결제 완료
        </div>
        {RES_PAID.map((r, i) => (
          <ResCard key={i} status="paid" label={r.label} when={r.when} detail={r.detail} amount={r.amount} />
        ))}
      </div>

      <div>
        <div className="font-display mb-1.5 text-[13px] font-bold text-ink">📌 확정 예약 (결제 없음/현장)</div>
        {RES_CONFIRMED.map((r, i) => (
          <ResCard key={i} status="confirmed" label={r.label} when={r.when} detail={r.detail} />
        ))}
      </div>

      <div>
        <div className="font-display mb-1.5 text-[13px] font-bold text-ink">🕓 아직 정해야 할 것</div>
        {RES_PENDING.map((r, i) => (
          <ResCard key={i} status="pending" label={r.label} when={r.when} detail={r.detail} />
        ))}
      </div>
    </div>
  );
}
