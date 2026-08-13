import { useEffect, useRef } from "react";

export default function DayTabs({ days, activeKey, onSelect }) {
  const refs = useRef({});

  useEffect(() => {
    refs.current[activeKey]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeKey]);

  return (
    <div className="scrollbar-none flex gap-1.5 overflow-x-auto px-4 pb-1 pt-3.5">
      {days.map((day) => {
        const isActive = day.key === activeKey;
        return (
          <button
            key={day.key}
            ref={(el) => (refs.current[day.key] = el)}
            onClick={() => onSelect(day.key)}
            className={`notch-sm min-w-[64px] shrink-0 border-2 border-ink px-2.5 py-2 text-left transition-colors ${
              isActive ? "sunset-gradient glow-gold" : "bg-surface"
            }`}
          >
            <span className={`block text-[10.5px] ${isActive ? "text-white/85" : "text-muted"}`}>{day.date}</span>
            <span className={`font-display mt-0.5 block text-[13px] font-bold ${isActive ? "text-white" : "text-ink"}`}>
              Day {day.key.slice(1)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
