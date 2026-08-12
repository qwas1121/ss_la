const STYLES = {
  paid: "bg-gradient-to-br from-good to-[#166b47] text-white",
  confirmed: "bg-gradient-to-br from-secondary to-primary-dark text-white",
  pending: "border border-dashed border-black/15 bg-white text-ink",
};

const ICONS = { paid: "✅", confirmed: "📌", pending: "🕓" };

export default function ResCard({ status = "pending", label, when, detail, amount }) {
  const isPending = status === "pending";
  return (
    <div className={`mb-2.5 rounded-2xl px-3.5 py-3 ${STYLES[status]}`}>
      <b className={`block text-[13.5px] font-bold ${isPending ? "text-ink" : ""}`}>
        {ICONS[status]} {label}
      </b>
      {when && <span className={`block text-[12px] ${isPending ? "text-ink-soft" : "opacity-90"}`}>{when}</span>}
      {detail && <span className={`block text-[12px] ${isPending ? "text-ink-soft" : "opacity-90"}`}>{detail}</span>}
      {amount && (
        <span className="mt-1.5 inline-block rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold">{amount}</span>
      )}
    </div>
  );
}
