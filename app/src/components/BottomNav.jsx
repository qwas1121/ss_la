import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "schedule", icon: "🗓️", label: "일정" },
  { id: "reservations", icon: "🧾", label: "예약" },
  { id: "shopping", icon: "🛍️", label: "쇼핑" },
  { id: "budget", icon: "💰", label: "예산" },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="sticky bottom-0 z-50 border-t border-black/[0.06] bg-white/90 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10.5px] font-bold"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl bg-primary-soft"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className={`relative text-[19px] leading-none ${isActive ? "" : "grayscale opacity-60"}`}>{item.icon}</span>
              <span className={`relative ${isActive ? "text-primary-dark" : "text-ink-soft"}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
