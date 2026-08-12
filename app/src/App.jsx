import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./components/Hero";
import BottomNav from "./components/BottomNav";
import ScheduleView from "./views/ScheduleView";
import ReservationsView from "./views/ReservationsView";
import ShoppingView from "./views/ShoppingView";
import BudgetView from "./views/BudgetView";

const VIEWS = {
  schedule: ScheduleView,
  reservations: ReservationsView,
  shopping: ShoppingView,
  budget: BudgetView,
};

export default function App() {
  const [view, setView] = useState("schedule");
  const ActiveView = VIEWS[view];

  const handleChange = (next) => {
    setView(next);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-bg sm:py-6">
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-bg sm:min-h-0 sm:overflow-hidden sm:rounded-[32px] sm:shadow-float sm:ring-1 sm:ring-black/[0.04]">
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
  );
}
