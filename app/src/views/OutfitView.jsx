import { useEffect, useState } from "react";
import { WEATHER_NOTE } from "../data/trip";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { listDayMeta } from "../lib/scheduleApi";
import DayTabs from "../components/DayTabs";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import { useOutfitList } from "../hooks/useOutfitList";

function OutfitChecklist({ dayKey }) {
  const { items, addItem, toggleItem, removeItem } = useOutfitList(dayKey);
  const [draft, setDraft] = useState("");

  const submit = () => {
    addItem(draft);
    setDraft("");
  };

  return (
    <div>
      <div className="flex gap-1.5">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="입을 옷 추가 (예: 가벼운 원피스)"
          className="notch-sm min-w-0 flex-1 border-2 border-ink bg-white px-3 py-2 font-sans text-[13px]"
        />
        <button onClick={submit} className="notch-sm font-display shrink-0 border-2 border-ink bg-primary px-3.5 py-2 text-[13px] font-bold text-white">
          + 추가
        </button>
      </div>

      {items.length === 0 ? (
        <div className="notch-lg mt-2.5 border-2 border-dashed border-ink/30 bg-surface px-4 py-8 text-center text-[12.5px] text-muted">
          아직 담은 옷이 없어요. 위에서 추가해보세요.
        </div>
      ) : (
        <div className="mt-2.5 flex flex-col gap-2">
          {items.map((it) => (
            <label
              key={it.id}
              className={`notch-lg flex cursor-pointer items-center gap-2.5 border-2 border-ink bg-surface px-3.5 py-2.5 transition-opacity ${
                it.checked ? "opacity-50" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={it.checked}
                onChange={() => toggleItem(it.id)}
                className="h-4 w-4 shrink-0 border-2 border-ink accent-primary"
              />
              <span className={`flex-1 text-[13px] text-ink ${it.checked ? "line-through" : ""}`}>{it.text}</span>
              <button onClick={() => removeItem(it.id)} className="shrink-0 px-1 text-[13px] text-muted" aria-label="삭제">
                ✕
              </button>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OutfitView() {
  const [days, setDays] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    listDayMeta()
      .then((data) => {
        setDays(data);
        setLoaded(true);
      })
      .catch((err) => console.error("listDayMeta failed", err));
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="px-4 pb-2 pt-4">
        <SupabaseSetupNotice />
      </div>
    );
  }

  if (!loaded || days.length === 0) {
    return (
      <div className="px-4 pb-2 pt-4">
        <div className="notch-lg border-2 border-ink bg-surface px-4 py-24 text-center text-[13px] text-muted">
          {loaded ? "아직 등록된 일정이 없어요." : "불러오는 중..."}
        </div>
      </div>
    );
  }

  const day = days[index];

  return (
    <div>
      <DayTabs days={days} activeKey={day.key} onSelect={(key) => setIndex(days.findIndex((d) => d.key === key))} />

      <div className="flex flex-col gap-3.5 px-4 pb-2 pt-3">
        <div className="notch-lg border-2 border-ink bg-surface p-3.5">
          <h2 className="m-0 mb-1.5 text-[15px] font-bold text-secondary">{day.title}</h2>
          {day.weather && (
            <div className="notch-sm font-display mt-1 inline-block border-2 border-ink bg-info-soft px-2.5 py-1.5 text-[12px] font-bold text-ink">
              🌤️ {day.weather}
            </div>
          )}
        </div>

        <div>
          <div className="font-display mb-1.5 text-[13px] font-bold text-ink">👗 오늘의 코디</div>
          <OutfitChecklist dayKey={day.key} />
        </div>

        <p className="mt-1 text-center text-[11px] leading-relaxed text-muted">{WEATHER_NOTE}</p>
      </div>
    </div>
  );
}
