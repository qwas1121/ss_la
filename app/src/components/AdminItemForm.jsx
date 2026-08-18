import { useState } from "react";

const EMPTY = { t: "", icon: "📌", title: "", note: "", tip: "", place: "", move: "" };
const MOVE_OPTIONS = ["도보", "지하철", "버스", "트램", "기차", "택시", "항공", "자전거"];

export default function AdminItemForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial, move: initial?.move ?? "" }));

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const pickMove = (m) => setForm((f) => ({ ...f, move: f.move === m ? "" : m }));

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
      move: form.move || null,
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
      {form.place.trim() && (
        <p className="m-0 text-[10.5px] text-ink-soft">📍 저장하면 좌표를 자동으로 찾아서 오버뷰 지도에 표시해요</p>
      )}

      <div>
        <p className="m-0 mb-1 text-[10.5px] font-bold text-ink-soft">이동수단 (선택)</p>
        <div className="flex flex-wrap gap-1">
          {MOVE_OPTIONS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => pickMove(m)}
              className={`notch-sm border-2 border-ink px-2 py-1 text-[11px] font-bold ${
                form.move === m ? "bg-primary text-white" : "bg-white text-ink"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

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
