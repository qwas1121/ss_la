import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { listOutfitItems, addOutfitItem, toggleOutfitItem, removeOutfitItem } from "../lib/outfitApi";

export function useOutfitList(dayKey) {
  const [items, setItems] = useState([]);

  const reload = useCallback(() => {
    if (!isSupabaseConfigured) return;
    listOutfitItems(dayKey)
      .then(setItems)
      .catch((err) => console.error("useOutfitList load failed", err));
  }, [dayKey]);

  useEffect(() => {
    setItems([]);
    reload();
  }, [reload]);

  const addItem = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || !isSupabaseConfigured) return;
      try {
        const nextOrder = items.length;
        const row = await addOutfitItem(dayKey, trimmed, nextOrder);
        setItems((prev) => [...prev, row]);
      } catch (err) {
        console.error("addOutfitItem failed", err);
      }
    },
    [dayKey, items.length]
  );

  const toggleItem = useCallback(
    async (id) => {
      const target = items.find((it) => it.id === id);
      if (!target) return;
      const nextChecked = !target.checked;
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, checked: nextChecked } : it)));
      try {
        await toggleOutfitItem(id, nextChecked);
      } catch (err) {
        console.error("toggleOutfitItem failed", err);
      }
    },
    [items]
  );

  const removeItem = useCallback(async (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    try {
      await removeOutfitItem(id);
    } catch (err) {
      console.error("removeOutfitItem failed", err);
    }
  }, []);

  return { items, addItem, toggleItem, removeItem };
}
