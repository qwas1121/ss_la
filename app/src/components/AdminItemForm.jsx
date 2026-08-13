import { useState } from "react";

const EMPTY = { t: "", icon: "📌", title: "", note: "", tip: "", place: "" };

export default function AdminItemForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }));

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      t: form.t.trim() || "—",
      icon: form.icon.trim() || "📌",
      title: form.title.trim(),
      note: form.note.trim(),
      tip: form.tip.trim() || null,
      place: form.place.trim() || null,
    });
  };

  return (
    <form onSubmit={submit} className="notch-lg mb-2.5 flex flex-col gap-2 border-2 border-dashed border-secondary bg-secondary-soft p-3.5">
      <div className="flex gap-1.5">
        <input value={form.t} onChange={set("t")} placeholder="시간 (예: 09:40)" className="notch-sm w-24 shrink-0 border-2 border-ink bg-white px-2.5 py-2 text-[12.5px]" />
        <input value={form.icon} onChange={set("icon")} placeholder="🛬" className="notch-sm w-14 shrink-0 border-2 border-ink bg-white px-2.5 py-2 text-center text-[14px]" />
        <input value={form.title} onChange={set("title")} placeholder="제목" className="notch-sm min-w-0 flex-1 border-2 border-ink bg-white px-2.5 py-2 text-[12.5px]" />
      </div>
      <input value={form.note} onChange={set("note")} placeholder="설명 (선택)" className="notch-sm border-2 border-ink bg-white px-2.5 py-2 text-[12.5px]" />
      <input value={form.tip} onChange={set("tip")} placeholder="팁 (선택)" className="notch-sm border-2 border-ink bg-white px-2.5 py-2 text-[12.5px]" />
      <input value={form.place} onChange={set("place")} placeholder="장소 (구글맵 검색어, 선택)" className="notch-sm border-2 border-ink bg-white px-2.5 py-2 text-[12.5px]" />
      <div className="flex gap-1.5">
        <button type="button" onClick={onCancel} className="notch-sm font-display flex-1 border-2 border-ink bg-white px-3 py-2 text-[12px] font-bold text-ink">
          취소
        </button>
        <button type="submit" disabled={saving} className="notch-sm font-display flex-1 border-2 border-ink bg-secondary px-3 py-2 text-[12px] font-bold text-white disabled:opacity-50">
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
