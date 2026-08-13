import { useEffect, useRef, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { fetchItemState, upsertItemState } from "../lib/itemStateApi";

const NOTE_DEBOUNCE_MS = 600;

export function useItemState(dayKey, itemIndex) {
  const [state, setState] = useState({ done: false, note: "" });
  const noteTimer = useRef(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    fetchItemState(dayKey, itemIndex)
      .then((data) => {
        if (!cancelled) setState(data);
      })
      .catch((err) => console.error("useItemState load failed", err));
    return () => {
      cancelled = true;
      clearTimeout(noteTimer.current);
    };
  }, [dayKey, itemIndex]);

  const setDone = (done) => {
    setState((s) => ({ ...s, done }));
    if (isSupabaseConfigured) upsertItemState(dayKey, itemIndex, { done }).catch((err) => console.error("setDone failed", err));
  };

  const setNote = (note) => {
    setState((s) => ({ ...s, note }));
    if (!isSupabaseConfigured) return;
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => {
      upsertItemState(dayKey, itemIndex, { note }).catch((err) => console.error("setNote failed", err));
    }, NOTE_DEBOUNCE_MS);
  };

  return { done: state.done, note: state.note, setDone, setNote };
}
