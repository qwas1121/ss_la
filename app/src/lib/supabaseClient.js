import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY가 설정되지 않았어요. app/.env.local을 채워주세요 (app/.env.example 참고)."
  );
}

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;
