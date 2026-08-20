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
    // 저장 타이머는 여기서 정리하지 않음 — 탭을 빨리 벗어나도(컴포넌트가 언마운트돼도)
    // 예약된 저장은 그대로 실행돼야 환율 수정이 유실되지 않음
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
