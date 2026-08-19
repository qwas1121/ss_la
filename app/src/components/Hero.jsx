import { TRIP_META } from "../data/trip";

function dDay() {
  const today = new Date();
  const start = new Date(TRIP_META.startDate + "T00:00:00");
  const end = new Date(TRIP_META.endDate + "T23:59:59");
  const oneDay = 24 * 60 * 60 * 1000;
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (todayStart < start) {
    const diff = Math.round((start - todayStart) / oneDay);
    return `D-${diff}`;
  }
  if (today <= end) return "여행 중";
  return "다녀왔어요";
}

const STARS = [
  { top: "12%", left: "58%", size: 2, delay: 0 },
  { top: "22%", left: "72%", size: 3, delay: 0.4 },
  { top: "10%", left: "82%", size: 2, delay: 0.9 },
  { top: "34%", left: "64%", size: 2, delay: 1.4 },
  { top: "16%", left: "91%", size: 3, delay: 0.2 },
  { top: "40%", left: "86%", size: 2, delay: 1.1 },
  { top: "6%", left: "70%", size: 2, delay: 1.8 },
];

export default function Hero() {
  return (
    <div
      className="sunset-gradient stripe-overlay relative overflow-hidden px-5 pb-[18px] text-white [box-shadow:0_10px_28px_-10px_oklch(76%_0.18_58_/_0.55)]"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 22px)" }}
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          aria-hidden="true"
        />
      ))}
      <span className="palm-silhouette bottom-[-10px] right-1 text-[64px] leading-none" aria-hidden="true">
        🌴
      </span>

      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-[11px] tracking-wide text-white/85">
            {TRIP_META.range} · {TRIP_META.nights} · {TRIP_META.people}
          </p>
          <h1 className="font-pixel-lg mt-1.5 text-[22px] font-bold leading-none [text-shadow:2px_2px_0_oklch(30%_0.08_320_/_0.5)]">
            {TRIP_META.title}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-1 text-[12px] text-white/90">
            <span>🌴 LA →</span>
            <span>🏜️ Grand Canyon →</span>
            <span>🌵 Sedona →</span>
            <span>☀️ Phoenix</span>
          </p>
        </div>
        <span className="notch-sm glow-gold shrink-0 bg-surface px-2.5 py-1 font-display text-[12px] font-bold text-secondary">
          {dDay()}
        </span>
      </div>
    </div>
  );
}
