import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function DayTabs({ days, activeKey, onSelect }) {
  const refs = useRef({});

  useEffect(() => {
    refs.current[activeKey]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeKey]);

  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto px-4 pb-1 pt-4">
      {days.map((day) => {
        const isActive = day.key === activeKey;
        return (
          <button
            key={day.key}
            ref={(el) => (refs.current[day.key] = el)}
            onClick={() => onSelect(day.key)}
            className="relative shrink-0 rounded-2xl px-3.5 py-2 text-left"
          >
            {isActive && (
              <motion.div
                layoutId="day-pill"
                className="absolute inset-0 rounded-2xl bg-primary"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className={`relative block text-[10px] font-medium ${isActive ? "text-white/85" : "text-muted"}`}>
              {day.date}
            </span>
            <span className={`relative block text-[12.5px] font-bold ${isActive ? "text-white" : "text-ink"}`}>
              {day.tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}
