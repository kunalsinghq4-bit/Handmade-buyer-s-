import { useEffect, useState } from 'react';
import { products, categories, byCategory, inr } from '../data/products';
import HeroCarousel from './HeroCarousel';

export function ProductCard({ p, onOpen = () => {} }) {
  const [bad, setBad] = useState(false);
  const [fav, setFav] = useState(false);
  return (
    <div onClick={() => onOpen(p)} className="rounded-2xl bg-white shadow-sm overflow-hidden active:scale-[.98] transition cursor-pointer">
      <div className="relative aspect-[4/5] bg-gradient-to-br from-indigo-100 to-pink-100">
        {!bad && (
          <img src={p.image} alt={p.title} loading="lazy" onError={() => setBad(true)} className="w-full h-full object-cover" />
        )}
        {bad && <div className="absolute inset-0 grid place-items-center text-indigo-700 text-xs px-2 text-center">{p.title}</div>}
        {p.tag && <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full">{p.tag}</span>}
        <button aria-label="Wishlist" onClick={(e) => { e.stopPropagation(); setFav(!fav); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 grid place-items-center text-lg">
          {fav ? '❤️' : '🤍'}
        </button>
        <span className="absolute bottom-2 left-2 bg-white/95 rounded-md px-1.5 py-0.5 text-[11px] font-semibold">
          ⭐ {p.rating} <span className="text-gray-400">({p.reviews})</span>
        </span>
      </div>
      <div className="p-2.5">
        <p className="text-[11px] text-gray-500 truncate">{p.maker} · {p.city}</p>
        <p className="text-sm font-medium truncate">{p.title}</p>
        <p className="mt-0.5">
          <span className="font-bold">{inr(p.price)}</span>{' '}
          {p.off > 0 && (<>
            <span className="text-xs text-gray-400 line-through">{inr(p.mrp)}</span>{' '}
            <span className="text-xs font-semibold text-green-600">{p.off}% off</span>
          </>)}
        </p>
      </div>
    </div>
  );
}

export function CategoryRow({ active, onPick }) {
  return (
    <div className="flex gap-4 overflow-x-auto px-3 py-4 no-scrollbar">
      {categories.map((c) => (
        <button key={c.name} onClick={() => onPick(active === c.name ? null : c.name)} className="shrink-0 w-16 text-center">
          <span className={`block w-16 h-16 rounded-full overflow-hidden border-2 ${active === c.name ? 'border-indigo-600' : 'border-transparent'} bg-indigo-100`}>
            <img src={c.image} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} className="w-full h-full object-cover" />
          </span>
          <span className="text-[11px] mt-1 block">{c.name}</span>
        </button>
      ))}
    </div>
  );
}

function useCountdown(hours = 5) {
  const [end] = useState(() => Date.now() + hours * 3600e3);
  const [left, setLeft] = useState(end - Date.now());
  useEffect(() => { const t = setInterval(() => setLeft(end - Date.now()), 1000); return () => clearInterval(t); }, [end]);
  const s = Math.max(0, Math.floor(left / 1000));
  const f = (n) => String(n).padStart(2, '0');
  return `${f(Math.floor(s / 3600))}:${f(Math.floor((s % 3600) / 60))}:${f(s % 60)}`;
}

export function FlashDeals({ onOpen }) {
  const time = useCountdown();
  const deals = products.filter((p) => p.off >= 30).slice(0, 12);
  return (
    <section className="mt-2 mx-3 rounded-3xl p-3 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
      <div className="flex items-center justify-between text-white mb-2">
        <h3 className="font-extrabold tracking-wide">⚡ SHANDAAR STEALS</h3>
        <span className="font-mono text-sm bg-black/30 px-2 py-0.5 rounded-lg">{time}</span>
      </div>
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
        {deals.map((p) => (
          <div key={p.id} className="shrink-0 w-36"><ProductCard p={p} onOpen={onOpen} /></div>
        ))}
      </div>
    </section>
  );
}

export function PromoStrip() {
  const items = ['🚚 Prepaid, safe & tracked', '🧵 100% handmade', '📍 Local makers near you', '🎁 Free gift wrap on festive orders'];
  return (
    <div className="mx-3 mt-3 overflow-hidden rounded-xl bg-indigo-900 text-white text-xs py-2">
      <div className="flex gap-8 whitespace-nowrap w-max" style={{ animation: 'marquee 22s linear infinite' }}>
        {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

export function ProductGrid({ category, limit = 100, onOpen }) {
  const list = byCategory(category).slice(0, limit);
  return (
    <section className="px-3 mt-5">
      <h3 className="font-bold text-lg mb-2">{category || 'Handmade for you'} <span className="text-sm font-normal text-gray-400">({list.length})</span></h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {list.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

// Drop-in Home body (replace your current Home content with this)
export default function HomeBody({ onOpenProduct }) {
  const [cat, setCat] = useState(null);
  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <HeroCarousel onCta={(s) => setCat(null)} />
      <CategoryRow active={cat} onPick={setCat} />
      <PromoStrip />
      <FlashDeals onOpen={onOpenProduct} />
      <ProductGrid category={cat} onOpen={onOpenProduct} />
    </div>
  );
}
