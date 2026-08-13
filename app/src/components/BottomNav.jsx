const NAV_ITEMS = [
  { id: "schedule", icon: "🗓️", label: "일정" },
  { id: "reservations", icon: "🎫", label: "예약" },
  { id: "shopping", icon: "🛍️", label: "쇼핑" },
  { id: "outfit", icon: "👗", label: "코디" },
  { id: "budget", icon: "💰", label: "예산" },
  { id: "info", icon: "🧭", label: "정보" },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="sticky bottom-0 z-50 flex border-t-2 border-ink bg-surface px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-1 flex-col items-center gap-0.5 px-1 py-1.5 ${isActive ? "notch-sm glow-gold bg-primary-soft" : ""}`}
          >
            <span className={`text-[18px] leading-none ${isActive ? "" : "opacity-60 grayscale"}`}>{item.icon}</span>
            <span className={`font-display text-[10px] font-bold ${isActive ? "text-primary-dark" : "text-muted"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
