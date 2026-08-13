import { useEffect, useRef, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { getExchangeRate, setExchangeRate } from "../lib/shoppingApi";

const DEBOUNCE_MS = 600;
const DEFAULT_RATE = 1417;

export function useExchangeRate() {
  const [rate, setRateState] = useState(DEFAULT_RATE);
  const timer = useRef(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    getExchangeRate()
      .then((value) => {
        if (value) setRateState(value);
      })
      .catch((err) => console.error("useExchangeRate load failed", err));
    return () => clearTimeout(timer.current);
  }, []);

  const setRate = (value) => {
    setRateState(value);
    if (!isSupabaseConfigured) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setExchangeRate(value).catch((err) => console.error("useExchangeRate save failed", err));
    }, DEBOUNCE_MS);
  };

  return { rate, setRate };
}
