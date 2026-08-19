import { listDays } from "./scheduleApi";
import { TRIP_META } from "../data/trip";

function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildText(days) {
  const lines = [];
  lines.push(TRIP_META.title);
  lines.push(`${TRIP_META.range} · ${TRIP_META.nights} · ${TRIP_META.people}`);
  lines.push("");

  days.forEach((day) => {
    lines.push(`■ ${day.tab} (${day.date}) ${day.title}`);
    if (day.concept) lines.push(day.concept);
    if (day.budget) lines.push(`예산: ${day.budget}`);
    if (day.hotel) lines.push(`숙소: ${day.hotel.name}${day.hotel.note ? ` (${day.hotel.note})` : ""}`);
    lines.push("");

    day.items.forEach((item) => {
      lines.push(`  ${item.t}  ${item.icon} ${item.title}`);
      if (item.note) lines.push(`    ${item.note}`);
      if (item.tip) lines.push(`    💡 ${item.tip}`);
      if (item.place) lines.push(`    📍 ${item.place}`);
    });
    lines.push("");
    lines.push("");
  });

  return lines.join("\n");
}

function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function buildCSV(days) {
  const header = ["Day", "날짜", "일정 제목", "컨셉", "예산", "시간", "아이콘", "항목", "메모", "팁", "장소"];
  const rows = [header];

  days.forEach((day) => {
    if (day.items.length === 0) {
      rows.push([day.tab, day.date, day.title, day.concept, day.budget, "", "", "", "", "", ""]);
      return;
    }
    day.items.forEach((item, idx) => {
      rows.push([
        idx === 0 ? day.tab : "",
        idx === 0 ? day.date : "",
        idx === 0 ? day.title : "",
        idx === 0 ? day.concept : "",
        idx === 0 ? day.budget : "",
        item.t,
        item.icon,
        item.title,
        item.note,
        item.tip ?? "",
        item.place ?? "",
      ]);
    });
  });

  return rows.map((row) => row.map(csvEscape).join(",")).join("\r\n");
}

export async function exportScheduleAsText() {
  const days = await listDays();
  downloadFile(buildText(days), `${TRIP_META.title}.txt`, "text/plain;charset=utf-8");
}

const UTF8_BOM = "﻿";

export async function exportScheduleAsCSV() {
  const days = await listDays();
  // Excel에서 한글이 깨지지 않도록 UTF-8 BOM 추가
  downloadFile(UTF8_BOM + buildCSV(days), `${TRIP_META.title}.csv`, "text/csv;charset=utf-8");
}
