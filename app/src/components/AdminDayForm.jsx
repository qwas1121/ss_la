import { useState } from "react";

export default function AdminDayForm({ day, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    title: day.title,
    concept: day.concept,
    budget: day.budget,
    weather: day.weather ?? "",
  });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="notch-lg mb-3.5 flex flex-col gap-2 border-2 border-dashed border-secondary bg-secondary-soft p-3.5">
      <input value={form.title} onChange={set("title")} placeholder="제목 (예: 🌴 LA 도착)" className="notch-sm border-2 border-ink bg-white px-2.5 py-2 text-[13px] font-bold" />
      <textarea value={form.concept} onChange={set("concept")} placeholder="컨셉/동선 요약" className="notch-sm min-h-[52px] resize-y border-2 border-ink bg-white px-2.5 py-2 text-[12.5px]" />
      <input value={form.budget} onChange={set("budget")} placeholder="예산 텍스트" className="notch-sm border-2 border-ink bg-white px-2.5 py-2 text-[12.5px]" />
      <input value={form.weather} onChange={set("weather")} placeholder="날씨 힌트 (선택)" className="notch-sm border-2 border-ink bg-white px-2.5 py-2 text-[12.5px]" />
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
