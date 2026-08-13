import { useState } from "react";
import { uploadShoppingPhoto } from "../lib/shoppingApi";

export default function ShoppingItemForm({ list, onAdd }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [priceText, setPriceText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f ?? null);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || busy) return;
    setBusy(true);
    try {
      let imageUrl = null;
      if (file) imageUrl = await uploadShoppingPhoto(file);
      await onAdd({ title: title.trim(), note: note.trim(), priceText: priceText.trim(), imageUrl, list });
      setTitle("");
      setNote("");
      setPriceText("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("shopping item add failed", err);
      alert("추가에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="notch-lg mb-2.5 flex flex-col gap-2 border-2 border-dashed border-ink/40 bg-surface p-3.5">
      <div className="flex gap-2">
        <label className="notch-sm flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden border-2 border-ink bg-surface-soft text-[11px] text-muted">
          {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : "📷 사진"}
          <input type="file" accept="image/*" onChange={pickFile} className="hidden" />
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="아이템 이름"
          className="notch-sm min-w-0 flex-1 border-2 border-ink bg-white px-3 py-2 font-sans text-[13px]"
        />
      </div>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="메모 (선택)"
        className="notch-sm border-2 border-ink bg-white px-3 py-2 font-sans text-[12.5px]"
      />
      <div className="flex gap-1.5">
        <input
          value={priceText}
          onChange={(e) => setPriceText(e.target.value)}
          placeholder="가격/구매처 (선택)"
          className="notch-sm min-w-0 flex-1 border-2 border-ink bg-white px-3 py-2 font-sans text-[12.5px]"
        />
        <button
          type="submit"
          disabled={busy || !title.trim()}
          className="notch-sm font-display shrink-0 border-2 border-ink bg-primary px-3.5 py-2 text-[12.5px] font-bold text-white disabled:opacity-50"
        >
          {busy ? "추가 중..." : "+ 추가"}
        </button>
      </div>
    </form>
  );
}
