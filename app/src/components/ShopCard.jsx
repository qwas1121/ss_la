import { useState } from "react";
import ShoppingItemForm from "./ShoppingItemForm";
import { formatKRW } from "../lib/format";

export default function ShopCard({ item, rate, onToggle, onRemove, onEdit }) {
  const [editing, setEditing] = useState(false);
  const isChecked = item.checked;

  if (editing) {
    return (
      <ShoppingItemForm
        initial={item}
        rate={rate}
        onCancel={() => setEditing(false)}
        onSubmit={async (payload) => {
          await onEdit(item.id, payload);
          setEditing(false);
        }}
      />
    );
  }

  const hasPrice = item.price_usd != null;
  const qty = item.quantity || 1;
  const unitKrw = hasPrice ? item.price_usd * rate : 0;
  const totalKrw = unitKrw * qty;

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
        {hasPrice ? (
          <p className="m-0 mt-1 text-[12px] font-bold text-primary-dark">
            ${item.price_usd} × {qty}개 · 개당 약 {formatKRW(unitKrw)} · 총 합 약 {formatKRW(totalKrw)}
          </p>
        ) : (
          item.price_text && <p className="m-0 mt-1 text-[12px] font-bold text-primary-dark">{item.price_text}</p>
        )}
        {item.store && <p className="m-0 mt-0.5 text-[11.5px] text-muted">📍 {item.store}</p>}
      </label>
      <div className="flex shrink-0 flex-col items-end gap-1 self-start">
        <button onClick={() => setEditing(true)} className="px-1 text-[13px] text-muted" aria-label="수정">
          ✏️
        </button>
        <button onClick={() => onRemove(item.id)} className="px-1 text-[13px] text-muted" aria-label="삭제">
          ✕
        </button>
      </div>
    </div>
  );
}
