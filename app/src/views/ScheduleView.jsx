import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DAYS } from "../data/trip";
import DayTabs from "../components/DayTabs";
import ItemCard from "../components/ItemCard";
import ResCard from "../components/ResCard";

const KEYS = DAYS.map((d) => d.key);

export default function ScheduleView() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touch = useRef({ x: 0, y: 0 });

  const day = DAYS[index];

  const goTo = (key) => {
    const nextIndex = KEYS.indexOf(key);
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  };

  const onTouchStart = (e) => {
    touch.current = { x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY };
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].screenX - touch.current.x;
    const dy = e.changedTouches[0].screenY - touch.current.y;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0 && index < DAYS.length - 1) goTo(KEYS[index + 1]);
    if (dx > 0 && index > 0) goTo(KEYS[index - 1]);
  };

  return (
    <div>
      <DayTabs days={DAYS} activeKey={day.key} onSelect={goTo} />
      <p className="mb-2 mt-0.5 text-center text-[11px] text-muted">👉 좌우로 스와이프해서 날짜 이동</p>

      <div className="overflow-hidden px-4 pb-2" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={day.key}
            custom={direction}
            initial={{ x: direction * 36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -36, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mb-3 rounded-2xl border border-black/[0.06] bg-surface p-4 shadow-card">
              <h2 className="m-0 mb-1.5 font-display text-[21px] text-primary-dark">{day.title}</h2>
              <p className="m-0 text-[13px] leading-relaxed text-ink-soft">{day.concept}</p>
              <div className="mt-2.5 flex w-fit items-center gap-1.5 rounded-full bg-surface-soft px-2.5 py-1.5 text-[12px] font-medium">
                💰 {day.budget}
              </div>
            </div>

            {day.reservations.length > 0 && (
              <>
                <div className="mb-2 ml-0.5 mt-4 text-[11px] font-bold uppercase tracking-wider text-secondary">확정 예약</div>
                {day.reservations.map((r, i) => (
                  <ResCard
                    key={i}
                    status={r.paid ? "paid" : r.confirmed ? "confirmed" : "pending"}
                    label={r.label}
                    detail={r.detail}
                    amount={r.amount}
                  />
                ))}
              </>
            )}

            <div className="mb-2 ml-0.5 mt-4 text-[11px] font-bold uppercase tracking-wider text-secondary">오늘의 일정</div>
            <div className="flex flex-col gap-2.5">
              {day.items.map((item, idx) => (
                <ItemCard key={idx} id={`${day.key}-${idx}`} item={item} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
