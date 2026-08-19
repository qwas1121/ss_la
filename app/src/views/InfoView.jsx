import { useState } from "react";
import { CONNECTIVITY_NOTE, EMERGENCY_CONTACTS, EMERGENCY_NOTE, PACKING_LIST } from "../data/trip";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { exportScheduleAsText, exportScheduleAsCSV } from "../lib/exportSchedule";
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
  const { rate, setRate } = useExchangeRate();
  const [exporting, setExporting] = useState(null); // null | "text" | "csv"

  const runExport = async (kind, fn) => {
    setExporting(kind);
    try {
      await fn();
    } catch (err) {
      console.error("export failed", err);
      alert("내보내기에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-2 pt-4">
      <div>
        <div className="font-display mb-1.5 text-[13px] font-bold text-ink">💱 환율</div>
        <div className="notch-lg flex items-center gap-2 border-2 border-ink bg-surface px-3.5 py-3 text-[13px] text-ink">
          <span>1 USD =</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            className="notch-sm w-20 border-2 border-ink bg-white px-2 py-1 text-right font-sans text-[13px]"
          />
          <span>원</span>
        </div>
        <p className="mt-1 text-[11px] text-muted">여행 전 실제 환율로 업데이트해두면 쇼핑 탭 가격 계산에도 그대로 반영돼요.</p>
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

      <div>
        <div className="font-display mb-1.5 text-[13px] font-bold text-ink">📤 일정 내보내기</div>
        <div className="flex gap-1.5">
          <button
            onClick={() => runExport("text", exportScheduleAsText)}
            disabled={exporting !== null}
            className="notch-lg flex-1 border-2 border-ink bg-surface px-3.5 py-2.5 text-[12.5px] font-bold text-ink disabled:opacity-50"
          >
            {exporting === "text" ? "내보내는 중..." : "📄 텍스트로"}
          </button>
          <button
            onClick={() => runExport("csv", exportScheduleAsCSV)}
            disabled={exporting !== null}
            className="notch-lg flex-1 border-2 border-ink bg-surface px-3.5 py-2.5 text-[12.5px] font-bold text-ink disabled:opacity-50"
          >
            {exporting === "csv" ? "내보내는 중..." : "📊 엑셀로"}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-muted">전체 일정(모든 날짜)을 파일로 저장해요. 엑셀 파일은 CSV 형식이라 대부분의 스프레드시트 앱에서 바로 열려요.</p>
      </div>

      <LogoutButton />
    </div>
  );
}
