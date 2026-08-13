import { useState } from "react";
import { uploadShoppingPhoto } from "../lib/shoppingApi";
import { formatKRW } from "../lib/format";

const emptyState = (initial) => ({
  title: initial?.title ?? "",
  note: initial?.note ?? "",
  priceUsd: initial?.price_usd != null ? String(initial.price_usd) : "",
  quantity: initial ? String(initial.quantity ?? 1) : "1",
  store: initial?.store ?? "",
});

export default function ShoppingItemForm({ list, initial, rate, onSubmit, onCancel }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(() => emptyState(initial));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.image_url ?? null);
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f ?? null);
    setPreview(f ? URL.createObjectURL(f) : (initial?.image_url ?? null));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || busy) return;
    setBusy(true);
    try {
      let imageUrl = initial?.image_url ?? null;
      if (file) imageUrl = await uploadShoppingPhoto(file);
      const payload = {
        title: form.title.trim(),
        note: form.note.trim(),
        priceUsd: form.priceUsd.trim() ? Number(form.priceUsd) : null,
        quantity: Math.max(1, Number(form.quantity) || 1),
        store: form.store.trim(),
        imageUrl,
      };
      if (!isEdit) payload.list = list;
      await onSubmit(payload);
      if (!isEdit) {
        setForm(emptyState());
        setFile(null);
        setPreview(null);
      }
    } catch (err) {
      console.error("shopping item save failed", err);
      alert("저장에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  };

  const priceUsdNum = Number(form.priceUsd) || 0;
  const qtyNum = Math.max(1, Number(form.quantity) || 1);
  const unitKrw = priceUsdNum * (rate || 0);
  const totalKrw = unitKrw * qtyNum;

  return (
    <form
      onSubmit={submit}
      className={`notch-lg mb-2.5 flex flex-col gap-2 border-2 p-3.5 ${
        isEdit ? "border-secondary bg-secondary-soft" : "border-dashed border-ink/40 bg-surface"
      }`}
    >
      <div className="flex gap-2">
        <label className="notch-sm flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden border-2 border-ink bg-surface-soft text-[11px] text-muted">
          {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : "📷 사진"}
          <input type="file" accept="image/*" onChange={pickFile} className="hidden" />
        </label>
        <input
          value={form.title}
          onChange={set("title")}
          placeholder="아이템 이름"
          className="notch-sm min-w-0 flex-1 border-2 border-ink bg-white px-3 py-2 font-sans text-[13px]"
        />
      </div>
      <input
        value={form.note}
        onChange={set("note")}
        placeholder="메모 (선택)"
        className="notch-sm border-2 border-ink bg-white px-3 py-2 font-sans text-[12.5px]"
      />
      <div className="flex gap-1.5">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={form.priceUsd}
          onChange={set("priceUsd")}
          placeholder="$ 단가"
          className="notch-sm min-w-0 flex-1 border-2 border-ink bg-white px-3 py-2 font-sans text-[12.5px]"
        />
        <input
          type="number"
          inputMode="numeric"
          min="1"
          step="1"
          value={form.quantity}
          onChange={set("quantity")}
          placeholder="수량"
          className="notch-sm w-16 shrink-0 border-2 border-ink bg-white px-2 py-2 text-center font-sans text-[12.5px]"
        />
      </div>
      <input
        value={form.store}
        onChange={set("store")}
        placeholder="구매처 (선택)"
        className="notch-sm border-2 border-ink bg-white px-3 py-2 font-sans text-[12.5px]"
      />

      {form.priceUsd.trim() && (
        <p className="m-0 text-[11.5px] font-bold text-primary-dark">
          개당 약 {formatKRW(unitKrw)} · {qtyNum}개 · 총 합 약 {formatKRW(totalKrw)}
        </p>
      )}

      <div className="flex gap-1.5">
        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="notch-sm font-display flex-1 border-2 border-ink bg-white px-3 py-2 text-[12.5px] font-bold text-ink"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          disabled={busy || !form.title.trim()}
          className="notch-sm font-display flex-1 border-2 border-ink bg-primary px-3.5 py-2 text-[12.5px] font-bold text-white disabled:opacity-50"
        >
          {busy ? "저장 중..." : isEdit ? "저장" : "+ 추가"}
        </button>
      </div>
    </form>
  );
}
