import { useState } from "react";
import { exportItemsExcel, readItemsExcel, applyItemsExcel } from "../lib/excelSync";

export default function ExcelSyncPanel() {
  const [exporting, setExporting] = useState(false);
  const [rows, setRows] = useState(null);
  const [fileName, setFileName] = useState("");
  const [applying, setApplying] = useState(false);
  const [result, setResult] = useState(null);

  const doExport = async () => {
    setExporting(true);
    try {
      await exportItemsExcel();
    } catch (err) {
      console.error("excel export failed", err);
      alert("내보내기에 실패했어요.");
    } finally {
      setExporting(false);
    }
  };

  const pickFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResult(null);
    setFileName(file.name);
    try {
      const parsed = await readItemsExcel(file);
      setRows(parsed);
    } catch (err) {
      console.error("excel read failed", err);
      alert("파일을 읽지 못했어요. 내보내기한 형식 그대로인지 확인해주세요.");
      setRows(null);
      setFileName("");
    }
  };

  const apply = async () => {
    if (!rows) return;
    setApplying(true);
    try {
      const r = await applyItemsExcel(rows);
      setResult(r);
      setRows(null);
      setFileName("");
    } catch (err) {
      console.error("excel apply failed", err);
      alert("반영 중 오류가 발생했어요. 일부만 반영됐을 수 있어요.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div>
      <div className="font-display mb-1.5 text-[13px] font-bold text-ink">📊 엑셀로 일정 관리</div>

      <button
        onClick={doExport}
        disabled={exporting}
        className="notch-lg w-full border-2 border-ink bg-surface px-3.5 py-2.5 text-[12.5px] font-bold text-ink disabled:opacity-50"
      >
        {exporting ? "내보내는 중..." : "📤 엑셀로 내보내기"}
      </button>
      <p className="mt-1 text-[11px] text-muted">
        일정 전체를 .xlsx 파일로 내려받아요. 셀 내용을 수정한 다음 (예: AI에게 검토를 맡기거나 직접 편집) 아래로 다시 업로드하면 반영돼요.
        <br />
        <b>id 칸이 채워진 행</b>은 기존 일정을 수정, <b>id가 비어있는 행</b>은 새 일정으로 추가돼요. 행을 지워도 삭제되진 않아요(안전).
      </p>

      <label className="notch-lg mt-2.5 flex w-full cursor-pointer items-center justify-center border-2 border-dashed border-ink/50 bg-surface px-3.5 py-2.5 text-[12.5px] font-bold text-ink-soft">
        📥 {fileName || "엑셀 파일 선택"}
        <input type="file" accept=".xlsx,.xls" onChange={pickFile} className="hidden" />
      </label>

      {rows && (
        <div className="notch-lg mt-2 border-2 border-ink bg-secondary-soft p-3">
          <p className="m-0 text-[12.5px] font-bold text-ink">{rows.length}개 행을 읽었어요.</p>
          <button
            onClick={apply}
            disabled={applying}
            className="notch-sm font-display mt-2 w-full border-2 border-ink bg-secondary px-3 py-2 text-[12px] font-bold text-white disabled:opacity-50"
          >
            {applying ? "반영 중..." : "이 내용으로 반영하기"}
          </button>
        </div>
      )}

      {result && (
        <div className="notch-lg mt-2 border-2 border-ink bg-good-soft p-3 text-[12px] text-good-text">
          <p className="m-0 font-bold">✅ 수정 {result.updated}개 · 추가 {result.added}개</p>
          {result.skipped.length > 0 && (
            <ul className="m-0 mt-1.5 list-disc pl-4 text-[11px] text-ink-soft">
              {result.skipped.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
