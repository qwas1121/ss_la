import { signOut } from "../lib/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="notch-lg flex w-full items-center justify-center gap-1.5 border-2 border-ink bg-surface px-3.5 py-2.5 text-[12.5px] font-bold text-ink-soft"
    >
      🔓 로그아웃
    </button>
  );
}
