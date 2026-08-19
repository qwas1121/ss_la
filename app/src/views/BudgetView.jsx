import { BUDGET, BUDGET_TOTAL_LABEL, BUDGET_NOTE } from "../data/trip";

const maxValue = Math.max(...BUDGET.map((b) => b.value));
const manwon = (v) => `${(v / 10000).toFixed(1)}만원`;
const paidTotal = BUDGET.filter((b) => b.paid).reduce((s, b) => s + b.value, 0);
const pendingTotal = BUDGET.filter((b) => !b.paid).reduce((s, b) => s + b.value, 0);

export default function BudgetView() {
  return (
    <div className="px-4 pb-2 pt-4">
      <div className="notch-lg budget-gradient border-2 border-ink px-4 py-5 text-center text-white">
        <div className="font-pixel-lg text-[24px] font-bold [text-shadow:2px_2px_0_oklch(30%_0.08_320_/_0.5)]">
          {BUDGET_TOTAL_LABEL}
        </div>
        <div className="mt-1 text-[11px] text-white/85">2인 · 쇼핑 제외 · 여유있게 잡은 예상 총액</div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="notch-sm border-2 border-ink bg-surface px-2.5 py-1 text-[11px] font-bold text-good-text">
            ✅ 결제완료 {manwon(paidTotal)}
          </span>
          <span className="notch-sm border-2 border-ink bg-surface px-2.5 py-1 text-[11px] font-bold text-secondary">
            🕐 예정 {manwon(pendingTotal)}
          </span>
        </div>
      </div>

      <div className="font-display mb-2 mt-4 text-[13px] font-bold text-ink">📊 항목별 내역</div>
      <div className="flex flex-col gap-2.5">
        {BUDGET.map((b, i) => (
          <div key={i} className="notch-lg border-2 border-ink bg-surface px-3.5 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] text-ink">{b.label}</span>
              <span className="shrink-0 text-[13px] font-bold text-ink">{b.amount}</span>
            </div>
            <div className="mt-2 h-2 border border-ink bg-surface-soft">
              <div
                className="pixel-stripe-fill h-full"
                style={{ width: `${Math.max(6, (b.value / maxValue) * 100)}%`, background: b.paid ? "var(--color-good)" : "var(--color-primary)" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* <p className="mt-4 whitespace-pre-line text-center text-[11.5px] leading-relaxed text-muted">{BUDGET_NOTE}</p> */}
    </div>
  );
}
