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

export async function addShoppingItem({ list, title, note, priceText, imageUrl, sortOrder }) {
  const { data, error } = await supabase
    .from("shopping_items")
    .insert({ list, title, note, price_text: priceText, image_url: imageUrl, sort_order: sortOrder })
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
