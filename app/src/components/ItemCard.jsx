import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mapsUrl, mapsEmbedUrl } from "../data/trip";
import { useItemState } from "../hooks/useItemState";
import { downloadICS } from "../lib/ics";

const MOVE_ICON = { 도보: "🚶", 지하철: "🚇", 버스: "🚌", 트램: "🚊", 기차: "🚆", 택시: "🚕", 항공: "✈️", 자전거: "🚲" };

export default function ItemCard({ dayKey, index, item, dateISO }) {
  const { done, note, setDone, setNote } = useItemState(dayKey, index);
  const [showMap, setShowMap] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const mapId = `${dayKey}-${index}`;

  return (
    <div className={`notch-lg border-2 border-ink bg-surface p-3.5 transition-opacity ${done ? "opacity-45" : ""}`}>
      <div className="flex gap-2.5">
        <span className="font-display shrink-0 text-[12px] font-bold text-primary-dark">{item.t}</span>
        <p className={`m-0 flex-1 text-[13.5px] font-bold leading-snug text-ink ${done ? "line-through" : ""}`}>
          {item.icon} {item.title}
        </p>
        {item.move && (
          <span className="notch-sm shrink-0 self-start border-2 border-ink bg-info-soft px-1.5 py-0.5 text-[10.5px] font-bold text-ink">
            {MOVE_ICON[item.move] ?? "🚗"} {item.move}
          </span>
        )}
      </div>
      {item.note && <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-ink-soft">{item.note}</p>}
      {item.tip && (
        <div className="notch-sm mt-1.5 border-2 border-gold bg-gold-soft px-2 py-1.5 text-[12px] leading-relaxed text-ink">
          💡 {item.tip}
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-1.5">
        {item.place && (
          <a
            href={mapsUrl(item.place)}
            target="_blank"
            rel="noopener noreferrer"
            className="notch-sm inline-flex items-center gap-1 border-2 border-ink bg-primary px-2.5 py-1 text-[11.5px] font-bold text-white"
          >
            📍 길찾기
          </a>
        )}
        {item.place && (
          <button
            onClick={() => setShowMap((v) => !v)}
            className="notch-sm inline-flex items-center gap-1 border-2 border-ink bg-white px-2.5 py-1 text-[11.5px] font-bold text-ink"
          >
            🗺️ 지도
          </button>
        )}
        <button
          onClick={() => setDone(!done)}
          className="notch-sm inline-flex items-center gap-1 border-2 border-ink bg-bg px-2.5 py-1 text-[11.5px] font-bold text-ink"
        >
          ✓ 완료
        </button>
        <button
          onClick={() => setShowNote((v) => !v)}
          className="notch-sm inline-flex items-center gap-1 border-2 border-ink bg-white px-2.5 py-1 text-[11.5px] font-bold text-ink"
        >
          ✏️ 메모
        </button>
        {dateISO && (
          <button
            onClick={() => downloadICS(item, dateISO)}
            className="notch-sm inline-flex items-center gap-1 border-2 border-ink bg-white px-2.5 py-1 text-[11.5px] font-bold text-ink"
          >
            📅 캘린더
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {showMap && item.place && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="notch-lg mt-2 overflow-hidden border-2 border-ink"
          >
            <iframe title={`map-${mapId}`} src={mapsEmbedUrl(item.place)} loading="lazy" className="block h-40 w-full border-0" />
          </motion.div>
        )}
        {showNote && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 overflow-hidden"
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="여기에 개인 메모 입력 (자동 저장됨)"
              className="notch-sm min-h-[52px] w-full resize-y border-2 border-ink bg-white p-2 font-sans text-[12.5px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
