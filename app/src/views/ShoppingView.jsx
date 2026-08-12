import { SHOP_GIFTS, SHOP_WISH } from "../data/trip";
import ShopCard from "../components/ShopCard";

export default function ShoppingView() {
  return (
    <div className="px-4 pb-2 pt-4">
      <div className="mb-2 ml-0.5 text-[11px] font-bold uppercase tracking-wider text-secondary">🎁 회사·가족 선물</div>
      {SHOP_GIFTS.map((item, i) => (
        <ShopCard key={i} id={`gift-${i}`} item={item} />
      ))}

      <div className="mb-2 ml-0.5 mt-4 text-[11px] font-bold uppercase tracking-wider text-secondary">🛍️ 내가 사고 싶은 것</div>
      {SHOP_WISH.map((item, i) => (
        <ShopCard key={i} id={`wish-${i}`} item={item} />
      ))}
    </div>
  );
}
