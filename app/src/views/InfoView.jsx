import { RATE, CONNECTIVITY_NOTE, EMERGENCY_CONTACTS, EMERGENCY_NOTE, PACKING_LIST } from "../data/trip";
import { useLocalStorage } from "../hooks/useLocalStorage";
import LogoutButton from "../components/LogoutButton";

function PackingItem({ label }) {
  const [checked, setChecked] = useLocalStorage(`pack_${label}`, "0");
  const isChecked = checked === "1";
  return (
    <label
      className={`notch-lg mb-2 flex cursor-pointer items-center gap-2.5 border-2 border-ink bg-surface px-3.5 py-2.5 transition-opacity ${
        isChecked ? "opacity-50" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setChecked(e.target.checked ? "1" : "0")}
        className="h-4 w-4 shrink-0 border-2 border-ink accent-primary"
      />
      <span className={`text-[13px] text-ink ${isChecked ? "line-through" : ""}`}>{label}</span>
    </label>
  );
}

export default function InfoView() {
  return (
    <div className="flex flex-col gap-4 px-4 pb-2 pt-4">
      <div>
        <div className="font-display mb-1.5 text-[13px] font-bold text-ink">💱 환율</div>
        <div className="notch-lg border-2 border-ink bg-surface px-3.5 py-3 text-[13px] text-ink">
          1 USD ≈ {RATE.toLocaleString("ko-KR")}원 (여행 전 재확인 필요)
        </div>
      </div>

      <div>
        <div className="font-display mb-1.5 text-[13px] font-bold text-ink">📶 통신</div>
        <div className="notch-lg border-2 border-ink bg-surface px-3.5 py-3 text-[13px] leading-relaxed text-ink">
          {CONNECTIVITY_NOTE}
        </div>
      </div>

      <div>
        <div className="font-display mb-1.5 text-[13px] font-bold text-ink">🚨 비상 연락처</div>
        {EMERGENCY_CONTACTS.map((c, i) => (
          <div
            key={i}
            className="notch-lg mb-2 flex items-center justify-between border-2 border-l-[6px] border-ink border-l-info bg-surface px-3.5 py-2.5"
          >
            <span className="text-[13px] text-ink">{c.label}</span>
            <span className="text-[13px] font-bold text-ink">{c.value}</span>
          </div>
        ))}
        <p className="mt-1 text-[11px] text-muted">{EMERGENCY_NOTE}</p>
      </div>

      <div>
        <div className="font-display mb-1.5 text-[13px] font-bold text-ink">🧳 준비물 체크리스트</div>
        {PACKING_LIST.map((p) => (
          <PackingItem key={p} label={p} />
        ))}
      </div>

      <LogoutButton />
    </div>
  );
}
