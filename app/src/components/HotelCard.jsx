export default function HotelCard({ hotel }) {
  return (
    <div>
      <div className="font-display mb-1.5 text-[13px] font-bold text-ink">🏨 숙소</div>
      <div className="notch-lg border-2 border-l-[6px] border-ink border-l-gold bg-surface px-3.5 py-3">
        <div className="text-[13px] font-bold text-ink">{hotel.name}</div>
        <div className="mt-1 text-[12px] leading-relaxed text-ink-soft">{hotel.note}</div>
      </div>
    </div>
  );
}
