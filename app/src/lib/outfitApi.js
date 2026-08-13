import { supabase } from "./supabaseClient";

export async function listOutfitItems(dayKey) {
  const { data, error } = await supabase
    .from("outfit_items")
    .select("*")
    .eq("day_key", dayKey)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function addOutfitItem(dayKey, text, sortOrder) {
  const { data, error } = await supabase
    .from("outfit_items")
    .insert({ day_key: dayKey, text, sort_order: sortOrder })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function toggleOutfitItem(id, checked) {
  const { error } = await supabase.from("outfit_items").update({ checked }).eq("id", id);
  if (error) throw error;
}

export async function removeOutfitItem(id) {
  const { error } = await supabase.from("outfit_items").delete().eq("id", id);
  if (error) throw error;
}
