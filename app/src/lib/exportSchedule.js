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

export async function exportScheduleAsText() {
  const days = await listDays();
  downloadFile(buildText(days), `${TRIP_META.title}.txt`, "text/plain;charset=utf-8");
}
