import { supabase } from "./supabaseClient";

const BUCKET = "shopping-photos";

export async function listShoppingItems() {
  const { data, error } = await supabase.from("shopping_items").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function uploadShoppingPhoto(file) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function addShoppingItem({ list, title, note, priceUsd, quantity, store, imageUrl, sortOrder }) {
  const { data, error } = await supabase
    .from("shopping_items")
    .insert({ list, title, note, price_usd: priceUsd, quantity, store, image_url: imageUrl, sort_order: sortOrder })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateShoppingItem(id, { title, note, priceUsd, quantity, store, imageUrl }) {
  const { data, error } = await supabase
    .from("shopping_items")
    .update({ title, note, price_usd: priceUsd, quantity, store, image_url: imageUrl })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function toggleShoppingItem(id, checked) {
  const { error } = await supabase.from("shopping_items").update({ checked }).eq("id", id);
  if (error) throw error;
}

export async function removeShoppingItem(id) {
  const { error } = await supabase.from("shopping_items").delete().eq("id", id);
  if (error) throw error;
}

export async function getExchangeRate() {
  const { data, error } = await supabase.from("app_settings").select("value").eq("key", "exchange_rate").maybeSingle();
  if (error) throw error;
  return data ? Number(data.value) : null;
}

export async function setExchangeRate(value) {
  const { error } = await supabase
    .from("app_settings")
    .upsert({ key: "exchange_rate", value: String(value), updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) throw error;
}
