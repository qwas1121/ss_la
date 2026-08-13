const BORDER_COLOR = {
  paid: "border-l-good",
  confirmed: "border-l-primary",
  pending: "border-l-gold",
};
const ICONS = { paid: "✅", confirmed: "📌", pending: "🕓" };

export default function ResCard({ status = "pending", label, when, detail, amount }) {
  return (
    <div className={`notch-lg mb-2.5 border-2 border-l-[6px] border-ink bg-surface px-3.5 py-3 ${BORDER_COLOR[status]}`}>
      <div className="flex items-center justify-between gap-2">
        <b className="text-[13px] font-bold text-ink">
          {ICONS[status]} {label}
        </b>
        {when && <span className="shrink-0 text-[11px] text-muted">{when}</span>}
      </div>
      {detail && <div className="mt-1 text-[12px] text-ink-soft">{detail}</div>}
      {amount && (
        <span className="notch-sm mt-1.5 inline-block border-2 border-ink bg-surface-soft px-2 py-0.5 text-[12px] font-bold text-ink">
          {amount}
        </span>
      )}
    </div>
  );
}
