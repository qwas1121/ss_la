import { useState } from "react";
import { useAuthRole, signIn } from "../lib/auth";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { TRIP_META } from "../data/trip";
import SupabaseSetupNotice from "./SupabaseSetupNotice";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(password);
    } catch {
      setError("비밀번호가 맞지 않아요.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="sunset-gradient stripe-overlay relative flex min-h-screen items-center justify-center px-6">
      <form onSubmit={submit} className="notch-lg w-full max-w-xs border-2 border-ink bg-surface p-6">
        <p className="font-display text-[11px] tracking-wide text-secondary">{TRIP_META.range}</p>
        <h1 className="font-pixel-lg mt-1 text-[20px] font-bold text-ink">{TRIP_META.title}</h1>
        <p className="mt-1 text-[12px] text-ink-soft">비밀번호를 입력하면 볼 수 있어요.</p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="notch-sm mt-4 w-full border-2 border-ink bg-white px-3 py-2.5 font-sans text-[13px]"
        />
        {error && <p className="mt-1.5 text-[11.5px] text-primary-dark">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="notch-sm font-display mt-3 w-full border-2 border-ink bg-secondary px-3 py-2.5 text-[13px] font-bold text-white disabled:opacity-50"
        >
          {busy ? "확인 중..." : "들어가기"}
        </button>
      </form>
    </div>
  );
}

export default function AuthGate({ children }) {
  const { isLoggedIn, ready } = useAuthRole();

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <SupabaseSetupNotice />
      </div>
    );
  }

  if (!ready) return null;

  if (!isLoggedIn) return <LoginForm />;

  return children;
}
