import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./components/Hero";
import BottomNav from "./components/BottomNav";
import AuthGate from "./components/AuthGate";
import ScheduleView from "./views/ScheduleView";
import ReservationsView from "./views/ReservationsView";
import ShoppingView from "./views/ShoppingView";
import BudgetView from "./views/BudgetView";
import InfoView from "./views/InfoView";
import OutfitView from "./views/OutfitView";

const VIEWS = {
  schedule: ScheduleView,
  reservations: ReservationsView,
  shopping: ShoppingView,
  outfit: OutfitView,
  budget: BudgetView,
  info: InfoView,
};

export default function App() {
  const [view, setView] = useState("schedule");
  const ActiveView = VIEWS[view];

  const handleChange = (next) => {
    setView(next);
    window.scrollTo({ top: 0 });
  };

  return (
    <AuthGate>
      <div className="min-h-screen bg-bg sm:py-8">
        <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-bg sm:min-h-0 sm:overflow-hidden sm:rounded-[32px] sm:border-[3px] sm:border-ink sm:[box-shadow:var(--shadow-sticker)]">
          <Hero />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                <ActiveView />
              </motion.div>
            </AnimatePresence>
          </main>
          <BottomNav active={view} onChange={handleChange} />
        </div>
      </div>
    </AuthGate>
  );
}
