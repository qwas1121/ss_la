import { useState, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored === null ? initialValue : stored;
  });

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        localStorage.setItem(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, update];
}

export function readBool(key) {
  return localStorage.getItem(key) === "1";
}
