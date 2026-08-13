import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { useAuthRole } from "../lib/auth";
import { listDays, updateDay, addScheduleItem, updateScheduleItem, deleteScheduleItem } from "../lib/scheduleApi";
import DayTabs from "../components/DayTabs";
import ItemCard from "../components/ItemCard";
import ResCard from "../components/ResCard";
import HotelCard from "../components/HotelCard";
import AdminItemForm from "../components/AdminItemForm";
import AdminDayForm from "../components/AdminDayForm";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";

const OverviewMap = lazy(() => import("../components/OverviewMap"));

export default function ScheduleView() {
  const { isAdmin } = useAuthRole();
  const [days, setDays] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mode, setMode] = useState("overview");
  const [editingDay, setEditingDay] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null); // null | "new" | item id
  const [saving, setSaving] = useState(false);
  const touch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    listDays()
      .then((data) => {
        setDays(data);
        setLoaded(true);
      })
      .catch((err) => console.error("listDays failed", err));
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="px-4 pb-2 pt-4">
        <SupabaseSetupNotice />
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="px-4 pb-2 pt-4">
        <div className="notch-lg border-2 border-ink bg-surface px-4 py-24 text-center text-[13px] text-muted">
          일정을 불러오는 중...
        </div>
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="px-4 pb-2 pt-4">
        <div className="notch-lg border-2 border-dashed border-ink/30 bg-surface px-4 py-10 text-center text-[13px] text-muted">
          아직 등록된 일정이 없어요. (supabase/seed.sql을 실행했는지 확인해보세요)
        </div>
      </div>
    );
  }

  const KEYS = days.map((d) => d.key);
  const day = days[index];

  const goTo = (key) => {
    const nextIndex = KEYS.indexOf(key);
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
    setEditingDay(false);
    setEditingItemId(null);
  };

  const onTouchStart = (e) => {
    touch.current = { x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY };
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].screenX - touch.current.x;
    const dy = e.changedTouches[0].screenY - touch.current.y;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0 && index < days.length - 1) goTo(KEYS[index + 1]);
    if (dx > 0 && index > 0) goTo(KEYS[index - 1]);
  };

  const patchDayLocal = (dayId, patch) => {
    setDays((prev) => prev.map((d) => (d.id === dayId ? { ...d, ...patch } : d)));
  };

  const saveDayMeta = async (form) => {
    setSaving(true);
    try {
      await updateDay(day.id, form);
      patchDayLocal(day.id, form);
      setEditingDay(false);
    } catch (err) {
      console.error("updateDay failed", err);
      alert("저장에 실패했어요.");
    } finally {
      setSaving(false);
    }
  };

  const saveItem = async (itemId, values) => {
    setSaving(true);
    try {
      if (itemId === "new") {
        const row = await addScheduleItem(day.id, values, day.items.length);
        patchDayLocal(day.id, { items: [...day.items, { ...values, id: row.id }] });
      } else {
        await updateScheduleItem(itemId, values);
        patchDayLocal(day.id, { items: day.items.map((it) => (it.id === itemId ? { ...it, ...values } : it)) });
      }
      setEditingItemId(null);
    } catch (err) {
      console.error("saveItem failed", err);
      alert("저장에 실패했어요.");
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (itemId) => {
    if (!confirm("이 일정을 삭제할까요?")) return;
    try {
      await deleteScheduleItem(itemId);
      patchDayLocal(day.id, { items: day.items.filter((it) => it.id !== itemId) });
    } catch (err) {
      console.error("deleteScheduleItem failed", err);
      alert("삭제에 실패했어요.");
    }
  };

  return (
    <div>
      <div className="flex gap-1.5 px-4 pt-3.5">
        <button
          onClick={() => setMode("overview")}
          className={`notch-sm font-display flex-1 border-2 border-ink px-3 py-2 text-[12.5px] font-bold ${
            mode === "overview" ? "bg-secondary text-white" : "bg-surface text-ink"
          }`}
        >
          🔖 오버뷰
        </button>
        <button
          onClick={() => setMode("list")}
          className={`notch-sm font-display flex-1 border-2 border-ink px-3 py-2 text-[12.5px] font-bold ${
            mode === "list" ? "bg-secondary text-white" : "bg-surface text-ink"
          }`}
        >
          📋 일정
        </button>
      </div>

      <DayTabs days={days} activeKey={day.key} onSelect={goTo} />
      <p className="font-display mb-2 mt-1 text-center text-[11px] text-muted">👉 좌우로 스와이프해서 날짜 이동</p>

      <div className="overflow-hidden px-4 pb-2" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={mode + day.key}
            custom={direction}
            initial={{ x: direction * 36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -36, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-3.5"
          >
            {editingDay ? (
              <AdminDayForm day={day} onSave={saveDayMeta} onCancel={() => setEditingDay(false)} saving={saving} />
            ) : (
              <div className="notch-lg border-2 border-ink bg-surface p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="m-0 mb-1.5 text-[15px] font-bold text-secondary">{day.title}</h2>
                  {isAdmin && (
                    <button onClick={() => setEditingDay(true)} className="notch-sm shrink-0 border-2 border-ink bg-white px-2 py-1 text-[11px] font-bold text-ink">
                      ✏️
                    </button>
                  )}
                </div>
                <p className="m-0 text-[13px] leading-relaxed text-ink-soft">{day.concept}</p>
                <div className="notch-sm font-display mt-2.5 inline-block border-2 border-ink bg-gold-soft px-2.5 py-1.5 text-[12px] font-bold text-ink">
                  💰 {day.budget}
                </div>
              </div>
            )}

            {mode === "overview" ? (
              <Suspense
                fallback={
                  <div className="notch-lg border-2 border-ink bg-surface px-4 py-24 text-center text-[13px] text-muted">
                    지도를 불러오는 중...
                  </div>
                }
              >
                <OverviewMap day={day} />
              </Suspense>
            ) : (
              <>
                {day.hotel && <HotelCard hotel={day.hotel} />}

                {day.reservations.length > 0 && (
                  <div>
                    <div className="font-display mb-1.5 text-[13px] font-bold text-ink">✅ 확정 예약</div>
                    {day.reservations.map((r, i) => (
                      <ResCard
                        key={i}
                        status={r.paid ? "paid" : r.confirmed ? "confirmed" : "pending"}
                        label={r.label}
                        detail={r.detail}
                        amount={r.amount}
                      />
                    ))}
                  </div>
                )}

                <div>
                  <div className="font-display mb-1.5 text-[13px] font-bold text-ink">📅 오늘의 일정</div>
                  <div className="flex flex-col gap-2.5">
                    {day.items.map((item, idx) =>
                      editingItemId === item.id ? (
                        <AdminItemForm
                          key={item.id}
                          initial={item}
                          saving={saving}
                          onCancel={() => setEditingItemId(null)}
                          onSave={(values) => saveItem(item.id, values)}
                        />
                      ) : (
                        <div key={item.id ?? idx} className="relative">
                          <ItemCard dayKey={day.key} index={idx} item={item} />
                          {isAdmin && (
                            <div className="absolute right-3 top-3 flex gap-1">
                              <button
                                onClick={() => setEditingItemId(item.id)}
                                className="notch-sm border-2 border-ink bg-white px-1.5 py-0.5 text-[10px] font-bold"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="notch-sm border-2 border-ink bg-white px-1.5 py-0.5 text-[10px] font-bold"
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  {isAdmin && editingItemId === "new" && (
                    <AdminItemForm saving={saving} onCancel={() => setEditingItemId(null)} onSave={(values) => saveItem("new", values)} />
                  )}
                  {isAdmin && editingItemId !== "new" && (
                    <button
                      onClick={() => setEditingItemId("new")}
                      className="notch-sm font-display mt-2.5 w-full border-2 border-dashed border-ink/50 bg-surface px-3 py-2.5 text-[12.5px] font-bold text-ink-soft"
                    >
                      + 일정 추가
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
