import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mapsUrl, mapsEmbedUrl } from "../data/trip";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function ItemCard({ id, item }) {
  const [done, setDone] = useLocalStorage(`done_${id}`, "0");
  const [note, setNote] = useLocalStorage(`note_${id}`, "");
  const [showMap, setShowMap] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const isDone = done === "1";

  return (
    <div
      className={`relative flex gap-3 rounded-2xl border border-black/[0.06] bg-surface p-3.5 shadow-card transition-opacity ${
        isDone ? "opacity-45" : ""
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-[17px]">{item.icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold text-primary">{item.t}</div>
        <p className={`m-0 mb-0.5 text-[14.5px] font-semibold leading-snug ${isDone ? "line-through" : ""}`}>{item.title}</p>
        {item.note && <p className="m-0 text-[12.5px] leading-relaxed text-ink-soft">{item.note}</p>}
        {item.tip && (
          <div className="mt-1.5 rounded-lg border-l-[3px] border-gold bg-gold-soft px-2 py-1.5 text-[12px] leading-relaxed text-ink">
            💡 {item.tip}
          </div>
        )}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.place && (
            <a
              href={mapsUrl(item.place)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11.5px] font-semibold text-white"
            >
              📍 길찾기
            </a>
          )}
          {item.place && (
            <button
              onClick={() => setShowMap((v) => !v)}
              className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[11.5px] font-semibold"
            >
              🗺️ 지도
            </button>
          )}
          <button
            onClick={() => setDone(isDone ? "0" : "1")}
            className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-bg px-2.5 py-1 text-[11.5px] font-semibold"
          >
            ✓ 완료
          </button>
          <button
            onClick={() => setShowNote((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[11.5px] font-semibold"
          >
            ✏️ 메모
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showMap && item.place && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 overflow-hidden rounded-xl border border-black/[0.06]"
            >
              <iframe
                title={`map-${id}`}
                src={mapsEmbedUrl(item.place)}
                loading="lazy"
                className="block h-40 w-full border-0"
              />
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
                className="min-h-[52px] w-full resize-y rounded-lg border border-black/[0.08] bg-white p-2 font-sans text-[12.5px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
