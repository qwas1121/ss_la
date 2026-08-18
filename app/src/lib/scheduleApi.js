import { supabase } from "./supabaseClient";
import { DAY_RESERVATIONS } from "../data/trip";

function toDay(row, items) {
  return {
    id: row.id,
    key: row.key,
    tab: row.tab,
    date: row.date,
    title: row.title,
    concept: row.concept,
    budget: row.budget,
    weather: row.weather,
    hotel: row.hotel_name ? { name: row.hotel_name, note: row.hotel_note ?? "" } : null,
    reservations: DAY_RESERVATIONS[row.key] ?? [],
    items: items
      .filter((it) => it.day_id === row.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((it) => ({
        id: it.id,
        t: it.t,
        icon: it.icon,
        title: it.title,
        note: it.note,
        tip: it.tip,
        place: it.place,
        lat: it.lat,
        lng: it.lng,
        move: it.move,
      })),
  };
}

// 아이템 없이 날짜 메타 정보만 필요한 화면(코디 탭 등)을 위한 가벼운 조회
export async function listDayMeta() {
  const { data, error } = await supabase.from("schedule_days").select("key, tab, date, title, weather").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function listDays() {
  const [{ data: days, error: daysErr }, { data: items, error: itemsErr }] = await Promise.all([
    supabase.from("schedule_days").select("*").order("sort_order"),
    supabase.from("schedule_items").select("*").order("sort_order"),
  ]);
  if (daysErr) throw daysErr;
  if (itemsErr) throw itemsErr;
  return (days ?? []).map((row) => toDay(row, items ?? []));
}

export async function updateDay(dayId, patch) {
  const { error } = await supabase.from("schedule_days").update(patch).eq("id", dayId);
  if (error) throw error;
}

export async function addScheduleItem(dayId, item, sortOrder) {
  const { data, error } = await supabase
    .from("schedule_items")
    .insert({ day_id: dayId, sort_order: sortOrder, ...item })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateScheduleItem(itemId, patch) {
  const { error } = await supabase.from("schedule_items").update(patch).eq("id", itemId);
  if (error) throw error;
}

export async function deleteScheduleItem(itemId) {
  const { error } = await supabase.from("schedule_items").delete().eq("id", itemId);
  if (error) throw error;
}
