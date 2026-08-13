export default function ShopCard({ item, onToggle, onRemove }) {
  const isChecked = item.checked;

  return (
    <div
      className={`notch-lg mb-2.5 flex items-start gap-2.5 border-2 border-ink bg-surface p-3.5 transition-opacity ${
        isChecked ? "opacity-50" : ""
      }`}
    >
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.title}
          className="notch-sm h-14 w-14 shrink-0 border-2 border-ink object-cover"
        />
      ) : (
        <div className="notch-sm flex h-14 w-14 shrink-0 items-center justify-center border-2 border-ink bg-surface-soft text-[22px]">
          🛍️
        </div>
      )}
      <label className="min-w-0 flex-1 cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <h4 className={`m-0 text-[13px] font-bold text-ink ${isChecked ? "line-through" : ""}`}>{item.title}</h4>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggle(item.id)}
            className="mt-0.5 h-4 w-4 shrink-0 border-2 border-ink accent-primary"
          />
        </div>
        {item.note && <p className="m-0 mt-1 text-[12px] leading-relaxed text-ink-soft">{item.note}</p>}
        {item.price_text && <p className="m-0 mt-1 text-[12px] font-bold text-primary-dark">{item.price_text}</p>}
      </label>
      <button onClick={() => onRemove(item.id)} className="shrink-0 self-start px-1 text-[13px] text-muted" aria-label="삭제">
        ✕
      </button>
    </div>
  );
}
