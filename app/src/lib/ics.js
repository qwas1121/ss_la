const pad = (n) => String(n).padStart(2, "0");

function escapeText(s) {
  return String(s ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function toTimedRange(dateISO, timeStr) {
  const match = /^(\d{1,2}):(\d{2})$/.exec((timeStr || "").trim());
  if (!match) return null;
  const [y, m, d] = dateISO.split("-").map(Number);
  const start = new Date(y, m - 1, d, Number(match[1]), Number(match[2]));
  const end = new Date(start.getTime() + 60 * 60000);
  const fmt = (dt) => `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
  return { start: fmt(start), end: fmt(end) };
}

function toAllDayRange(dateISO) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  const end = new Date(y, m - 1, d + 1);
  const fmt = (dt) => `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}`;
  return { start: fmt(start), end: fmt(end) };
}

// item: { title, note, place, t }, dateISO: "2026-09-19"
export function buildICS({ title, note, place, t }, dateISO) {
  const timed = toTimedRange(dateISO, t);
  const dtLines = timed
    ? [`DTSTART:${timed.start}`, `DTEND:${timed.end}`]
    : (() => {
        const d = toAllDayRange(dateISO);
        return [`DTSTART;VALUE=DATE:${d.start}`, `DTEND;VALUE=DATE:${d.end}`];
      })();

  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  const uid = `${stamp}-${Math.random().toString(36).slice(2, 10)}@la-trip-planner`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LA Trip Planner//KO",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    ...dtLines,
    `SUMMARY:${escapeText(title)}`,
    note ? `DESCRIPTION:${escapeText(note)}` : null,
    place ? `LOCATION:${escapeText(place)}` : null,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "TRIGGER:-PT30M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n");
}

export function downloadICS(item, dateISO) {
  const ics = buildICS(item, dateISO);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${item.title || "일정"}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
