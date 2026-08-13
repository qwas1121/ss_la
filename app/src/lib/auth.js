import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

export const ADMIN_EMAIL = "admin@la-trip.local";
export const VIEWER_EMAIL = "user@la-trip.local";

// 비밀번호 하나만 입력받되, 관리자 계정 → 뷰어 계정 순으로 시도해서
// 어느 쪽 비밀번호인지 자동으로 판별해요.
export async function signIn(password) {
  if (!isSupabaseConfigured) throw new Error("Supabase가 설정되지 않았어요.");
  const admin = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
  if (!admin.error) return;
  const viewer = await supabase.auth.signInWithPassword({ email: VIEWER_EMAIL, password });
  if (viewer.error) throw viewer.error;
}

export async function signOut() {
  if (!isSupabaseConfigured) return;
  await supabase.auth.signOut();
}

export function useAuthRole() {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return {
    isLoggedIn: Boolean(session),
    isAdmin: session?.user?.email === ADMIN_EMAIL,
    ready,
  };
}
