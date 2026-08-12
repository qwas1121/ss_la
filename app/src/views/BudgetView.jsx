import { BUDGET, BUDGET_TOTAL_LABEL, BUDGET_NOTE } from "../data/trip";

const maxValue = Math.max(...BUDGET.map((b) => b.value));
const manwon = (v) => `${(v / 10000).toFixed(1)}만원`;
const paidTotal = BUDGET.filter((b) => b.paid).reduce((s, b) => s + b.value, 0);
const pendingTotal = BUDGET.filter((b) => !b.paid).reduce((s, b) => s + b.value, 0);

export default function BudgetView() {
  return (
    <div className="px-4 pb-2 pt-4">
      <div className="sunset-gradient grain relative overflow-hidden rounded-2xl px-5 py-6 text-center text-white shadow-float">
        <div className="font-display text-[30px]">{BUDGET_TOTAL_LABEL}</div>
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/75">
          2인 · 쇼핑 제외 · 여유있게 잡은 예상 총액
        </div>
        <div className="relative mt-4 flex justify-center gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11.5px] font-semibold ring-1 ring-white/25">
            ✅ 결제완료 {manwon(paidTotal)}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11.5px] font-semibold ring-1 ring-white/25">
            🕓 예정 {manwon(pendingTotal)}
          </span>
        </div>
      </div>

      <div className="mb-2 ml-0.5 mt-5 text-[11px] font-bold uppercase tracking-wider text-secondary">항목별 내역</div>
      <div className="flex flex-col gap-2">
        {BUDGET.map((b, i) => (
          <div key={i} className="rounded-xl border border-black/[0.06] bg-surface p-3 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
                {b.paid && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-good" aria-hidden="true" />}
                {b.label}
              </span>
              <span className="shrink-0 text-[13px] font-bold text-ink">{b.amount}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-surface-soft">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${Math.max(6, (b.value / maxValue) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 whitespace-pre-line text-center text-[11.5px] leading-relaxed text-muted">{BUDGET_NOTE}</p>
    </div>
  );
}
