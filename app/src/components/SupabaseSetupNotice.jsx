export default function SupabaseSetupNotice() {
  return (
    <div className="notch-lg border-2 border-dashed border-ink/30 bg-surface px-4 py-8 text-center text-[12.5px] leading-relaxed text-muted">
      🔌 Supabase 설정이 필요해요.
      <br />
      <code className="text-[11.5px]">app/.env.local</code>에 <code className="text-[11.5px]">VITE_SUPABASE_URL</code>,{" "}
      <code className="text-[11.5px]">VITE_SUPABASE_ANON_KEY</code>를 채워주세요.
    </div>
  );
}
