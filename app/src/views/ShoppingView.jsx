import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { listShoppingItems, addShoppingItem, toggleShoppingItem, removeShoppingItem, updateShoppingItem } from "../lib/shoppingApi";
import { useExchangeRate } from "../hooks/useExchangeRate";
import ShopCard from "../components/ShopCard";
import ShoppingItemForm from "../components/ShoppingItemForm";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";

export default function ShoppingView() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { rate } = useExchangeRate();

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

  const handleEdit = async (id, payload) => {
    const row = await updateShoppingItem(id, payload);
    setItems((prev) => prev.map((it) => (it.id === id ? row : it)));
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

  const essentials = items.filter((it) => it.list === "gift");
  const clothing = items.filter((it) => it.list === "wish");

  return (
    <div className="px-4 pb-2 pt-4">
      <div className="notch-lg mb-3 flex items-center gap-2 border-2 border-ink bg-surface-soft px-3.5 py-2.5">
        <span className="font-display shrink-0 text-[12.5px] font-bold text-ink">💱 환율</span>
        <span className="text-[13px] text-ink">1 USD = {rate.toLocaleString("ko-KR")}원</span>
        <span className="ml-auto text-[11px] text-muted">정보 탭에서 수정</span>
      </div>

      <div className="font-display mb-2 text-[13px] font-bold text-ink">✅ 필수</div>
      <ShoppingItemForm list="gift" rate={rate} onSubmit={handleAdd} />
      {essentials.map((item) => (
        <ShopCard key={item.id} item={item} rate={rate} onToggle={handleToggle} onRemove={handleRemove} onEdit={handleEdit} />
      ))}

      <div className="font-display mb-2 mt-2 text-[13px] font-bold text-ink">👗 의류</div>
      <ShoppingItemForm list="wish" rate={rate} onSubmit={handleAdd} />
      {clothing.map((item) => (
        <ShopCard key={item.id} item={item} rate={rate} onToggle={handleToggle} onRemove={handleRemove} onEdit={handleEdit} />
      ))}

      {loaded && essentials.length === 0 && clothing.length === 0 && (
        <p className="mt-2 text-center text-[12px] text-muted">아직 담은 아이템이 없어요.</p>
      )}
    </div>
  );
}
