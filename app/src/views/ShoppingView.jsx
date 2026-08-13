import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { listShoppingItems, addShoppingItem, toggleShoppingItem, removeShoppingItem } from "../lib/shoppingApi";
import ShopCard from "../components/ShopCard";
import ShoppingItemForm from "../components/ShoppingItemForm";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";

export default function ShoppingView() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(() => {
    if (!isSupabaseConfigured) return;
    listShoppingItems()
      .then((data) => {
        setItems(data);
        setLoaded(true);
      })
      .catch((err) => console.error("shopping load failed", err));
  }, []);

  useEffect(reload, [reload]);

  const handleAdd = async (payload) => {
    const sameList = items.filter((it) => it.list === payload.list);
    const row = await addShoppingItem({ ...payload, sortOrder: sameList.length });
    setItems((prev) => [...prev, row]);
  };

  const handleToggle = async (id) => {
    const target = items.find((it) => it.id === id);
    if (!target) return;
    const next = !target.checked;
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, checked: next } : it)));
    toggleShoppingItem(id, next).catch((err) => console.error("toggle failed", err));
  };

  const handleRemove = async (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    removeShoppingItem(id).catch((err) => console.error("remove failed", err));
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="px-4 pb-2 pt-4">
        <SupabaseSetupNotice />
      </div>
    );
  }

  const gifts = items.filter((it) => it.list === "gift");
  const wishes = items.filter((it) => it.list === "wish");

  return (
    <div className="px-4 pb-2 pt-4">
      <div className="font-display mb-2 text-[13px] font-bold text-ink">🎁 회사·가족 선물</div>
      <ShoppingItemForm list="gift" onAdd={handleAdd} />
      {gifts.map((item) => (
        <ShopCard key={item.id} item={item} onToggle={handleToggle} onRemove={handleRemove} />
      ))}

      <div className="font-display mb-2 mt-2 text-[13px] font-bold text-ink">🛍️ 내가 사고 싶은 것</div>
      <ShoppingItemForm list="wish" onAdd={handleAdd} />
      {wishes.map((item) => (
        <ShopCard key={item.id} item={item} onToggle={handleToggle} onRemove={handleRemove} />
      ))}

      {loaded && gifts.length === 0 && wishes.length === 0 && (
        <p className="mt-2 text-center text-[12px] text-muted">아직 담은 아이템이 없어요.</p>
      )}
    </div>
  );
}
