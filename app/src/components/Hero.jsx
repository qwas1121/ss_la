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

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-b-[28px] sunset-gradient grain px-5 pt-7 pb-6 text-white shadow-float">
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
            {TRIP_META.range} · {TRIP_META.nights} · {TRIP_META.people}
          </p>
          <h1 className="mt-1 font-display text-[30px] leading-none">{TRIP_META.title}</h1>
          <p className="mt-2 text-[12.5px] text-white/85">{TRIP_META.route}</p>
        </div>
        <span className="mt-0.5 shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold tracking-wide backdrop-blur-sm ring-1 ring-white/25">
          {dDay()}
        </span>
      </div>
    </div>
  );
}
