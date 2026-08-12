import { krw } from "../data/trip";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function ShopCard({ id, item }) {
  const [checked, setChecked] = useLocalStorage(`shop_${id}`, "0");
  const isChecked = checked === "1";

  return (
    <label
      className={`mb-2.5 flex cursor-pointer items-start gap-3 rounded-2xl border border-black/[0.06] bg-surface p-3.5 shadow-card transition-opacity ${
        isChecked ? "opacity-50" : ""
      }`}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-[15px] font-bold tracking-tight text-white"
        style={{ background: item.color }}
      >
        {item.init}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className={`m-0 text-[14px] font-bold ${isChecked ? "line-through" : ""}`}>{item.name}</h4>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setChecked(e.target.checked ? "1" : "0")}
            className="mt-1 h-4 w-4 shrink-0 accent-primary"
          />
        </div>
        <p className="m-0 text-[12.5px] leading-relaxed text-ink-soft">{item.note}</p>
        <p className="m-0 mt-1 text-[12px] font-bold text-primary">
          {item.usdEach} <span className="font-medium text-ink-soft">(총 {krw(item.usd)})</span>
        </p>
        <p className="m-0 mt-0.5 text-[11.5px] text-muted">{item.where}</p>
      </div>
    </label>
  );
}
