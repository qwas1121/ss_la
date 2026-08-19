import * as XLSX from "xlsx";
import { listDays, addScheduleItem, updateScheduleItem } from "./scheduleApi";
import { geocodePlace } from "./geocode";
import { timeKey, findTimeInsertIndex } from "./format";
import { TRIP_META } from "../data/trip";

const COLUMNS = ["id", "Day", "날짜", "일정제목", "시간", "아이콘", "제목", "메모", "팁", "장소"];

// 마이크로소프트 엑셀이 파일을 열었다 저장하면 이모지(서로게이트 페어)가
// 깨지는 경우가 있어서, 깨진 것 같으면 기존 값을 그대로 유지함.
function isValidIcon(s) {
  if (!s) return false;
  if (s.includes("�")) return false; // 디코딩 실패 표시 문자
  return /\p{Extended_Pictographic}/u.test(s);
}

export async function exportItemsExcel() {
  const days = await listDays();
  const rows = [COLUMNS];

  days.forEach((day) => {
    day.items.forEach((item) => {
      rows.push([item.id, day.tab, day.date, day.title, item.t ?? "", item.icon ?? "", item.title ?? "", item.note ?? "", item.tip ?? "", item.place ?? ""]);
    });
  });

  const sheet = XLSX.utils.aoa_to_sheet(rows);
  sheet["!cols"] = [{ wch: 24 }, { wch: 8 }, { wch: 10 }, { wch: 16 }, { wch: 8 }, { wch: 6 }, { wch: 20 }, { wch: 24 }, { wch: 24 }, { wch: 28 }];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "일정");
  XLSX.writeFile(workbook, `${TRIP_META.title} - 일정.xlsx`);
}

// 업로드한 엑셀 파일을 읽어서 { rows, dayByTab } 형태로 반환 (아직 DB에 반영하지 않음)
export async function readItemsExcel(file) {
  const buf = await file.arrayBuffer();
  const workbook = XLSX.read(buf, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  return rows;
}

// rows: readItemsExcel()이 반환한 배열. 실제로 DB에 반영(추가/수정)함.
// 삭제는 하지 않음 — 시트에서 행을 지워도 기존 일정은 그대로 남음(안전).
export async function applyItemsExcel(rows) {
  const days = await listDays();
  const dayByTab = new Map(days.map((d) => [d.tab, d]));
  const itemById = new Map(days.flatMap((d) => d.items.map((it) => [it.id, { ...it, dayKey: d.key }])));
  // id가 안 맞을 때(파일이 최신 상태가 아닐 때) 같은 날짜+제목으로 한 번 더 찾아봄
  const itemByDayAndTitle = new Map(days.flatMap((d) => d.items.map((it) => [`${d.tab}::${it.title}`, it])));

  const result = { updated: 0, added: 0, healed: [], skipped: [] };

  for (const row of rows) {
    const day = dayByTab.get(String(row["Day"] ?? "").trim());
    if (!day) {
      result.skipped.push(`"${row["Day"]}" 날짜를 찾을 수 없어요 (제목: ${row["제목"] || "(제목 없음)"})`);
      continue;
    }

    const title = String(row["제목"] ?? "").trim();
    if (!title) {
      result.skipped.push(`제목이 비어있는 행 (Day: ${row["Day"]})`);
      continue;
    }

    const id = String(row["id"] ?? "").trim();
    let place = String(row["장소"] ?? "").trim() || null;
    const rawIcon = String(row["아이콘"] ?? "").trim();

    const values = {
      t: String(row["시간"] ?? "").trim() || "—",
      title,
      note: String(row["메모"] ?? "").trim(),
      tip: String(row["팁"] ?? "").trim() || null,
      place,
    };

    try {
      if (id) {
        let existing = itemById.get(id);
        let realId = id;
        let healedFromStaleId = false;

        if (!existing) {
          // id가 최신이 아닐 수 있음 — 같은 날짜의 같은 제목으로 한 번 더 시도
          const fallback = itemByDayAndTitle.get(`${day.tab}::${title}`);
          if (fallback) {
            existing = fallback;
            realId = fallback.id;
            healedFromStaleId = true;
          } else {
            result.skipped.push(`id(${id})를 가진 기존 일정을 찾을 수 없어요 (제목: ${title})`);
            continue;
          }
        }

        if (isValidIcon(rawIcon)) {
          values.icon = rawIcon;
        } else if (rawIcon && rawIcon !== existing.icon) {
          result.skipped.push(`"${title}"의 아이콘 값이 깨진 것 같아 기존 아이콘을 유지했어요`);
        }
        if (place && place !== existing.place) {
          const coords = await geocodePlace(place);
          if (coords) Object.assign(values, coords);
        }
        await updateScheduleItem(realId, values);
        if (healedFromStaleId) result.healed.push(`"${title}" (${day.tab})`);
        result.updated++;
      } else {
        values.icon = isValidIcon(rawIcon) ? rawIcon : "📌";
        if (place) {
          const coords = await geocodePlace(place);
          if (coords) Object.assign(values, coords);
        }
        const currentItems = dayByTab.get(day.tab).items;
        const insertAt = findTimeInsertIndex(currentItems, timeKey(values.t));
        const newRow = await addScheduleItem(day.id, values, insertAt);
        currentItems.splice(insertAt, 0, { ...values, id: newRow.id });

        // 새로 끼워넣은 항목 뒤로 밀린 기존 항목들의 sort_order도 DB에 반영
        const shifted = currentItems.slice(insertAt + 1);
        await Promise.all(shifted.map((it, i) => updateScheduleItem(it.id, { sort_order: insertAt + 1 + i })));

        result.added++;
      }
    } catch (err) {
      console.error("엑셀 행 반영 실패", row, err);
      result.skipped.push(`"${title}" 반영 실패: ${err.message ?? err}`);
    }
  }

  return result;
}
