import { supabase } from "./supabaseClient";

export async function fetchItemState(dayKey, itemIndex) {
  const { data, error } = await supabase
    .from("item_state")
    .select("done, note")
    .eq("day_key", dayKey)
    .eq("item_index", itemIndex)
    .maybeSingle();
  if (error) throw error;
  return data ?? { done: false, note: "" };
}

export async function fetchDayDoneCount(dayKey) {
  const { count, error } = await supabase
    .from("item_state")
    .select("*", { count: "exact", head: true })
    .eq("day_key", dayKey)
    .eq("done", true);
  if (error) throw error;
  return count ?? 0;
}

// { [item_index]: true } for done items on this day — used to split the overview map's
// route into a "traveled" vs "remaining" style.
export async function fetchDayDoneMap(dayKey) {
  const { data, error } = await supabase.from("item_state").select("item_index, done").eq("day_key", dayKey).eq("done", true);
  if (error) throw error;
  const map = {};
  for (const row of data ?? []) map[row.item_index] = true;
  return map;
}

export async function upsertItemState(dayKey, itemIndex, patch) {
  const { error } = await supabase
    .from("item_state")
    .upsert({ day_key: dayKey, item_index: itemIndex, ...patch, updated_at: new Date().toISOString() }, { onConflict: "day_key,item_index" });
  if (error) throw error;
}
