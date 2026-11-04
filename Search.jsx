import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { ProductCard, Empty } from '../components/Card'
import { PRODUCTS, STORES, CATS } from '../data/mock'
import { useApp } from '../store/useApp'
export default function Search({ wishlist }) {
  const { city, wish } = useApp(), [sp] = useSearchParams(), [q, setQ] = useState(''), [sheet, setSheet] = useState(false)
  const [f, setF] = useState({ cat: sp.get('cat') || '', max: 5000, verified: false }), [sort, setSort] = useState('rel')
  const vstore = id => STORES.find(s => s.id === id).verified
  const list = useMemo(() => {
    let l = PRODUCTS.filter(p => p.city === city && (!wishlist || wish.includes(p.id)) && p.name.toLowerCase().includes(q.toLowerCase())
      && (!f.cat || p.cat === f.cat) && p.price <= f.max && (!f.verified || vstore(p.storeId)))
    if (sort === 'lo') l = [...l].sort((a, b) => a.price - b.price); if (sort === 'hi') l = [...l].sort((a, b) => b.price - a.price)
    return l }, [q, f, sort, city, wish, wishlist])
  const sugg = q ? [...new Set(PRODUCTS.filter(p => p.city === city && p.name.toLowerCase().includes(q.toLowerCase())).map(p => p.name))].slice(0, 4) : []
  return <div className="p-3">
    {wishlist ? <h1 className="mb-2 text-xl font-bold">Wishlist</h1> : <input aria-label="Search products" autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search kurta, jhumkas, diya..." className="min-h-[44px] w-full rounded-xl border px-3" />}
    {sugg.length > 0 && sugg[0].toLowerCase() !== q.toLowerCase() && <ul className="mt-1 rounded-xl bg-white shadow-card">{sugg.map(s => <li key={s}><button className="min-h-[44px] w-full px-3 text-left" onClick={() => setQ(s)}>{s}</button></li>)}</ul>}
    <div className="my-3 flex items-center gap-2"><button className="chip gap-1" onClick={() => setSheet(true)}><SlidersHorizontal size={16} />Filters</button>
      <select aria-label="Sort" value={sort} onChange={e => setSort(e.target.value)} className="chip"><option value="rel">Relevance</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select></div>
    {list.length ? <div className="grid grid-cols-2 gap-3">{list.map(p => <ProductCard key={p.id} p={p} />)}</div> : <Empty t={wishlist ? 'Nothing saved yet' : 'No matches'} d="Try clearing filters." />}
    {sheet && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSheet(false)}><div role="dialog" aria-label="Filters" className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl rounded-t-3xl bg-white p-5" onClick={e => e.stopPropagation()}>
      <h2 className="mb-3 font-bold">Filters</h2><div className="flex flex-wrap gap-2">{CATS.map(c => <button key={c} aria-pressed={f.cat === c} className={`chip ${f.cat === c ? 'border-brand bg-brand text-white' : ''}`} onClick={() => setF({ ...f, cat: f.cat === c ? '' : c })}>{c}</button>)}</div>
      <label className="mt-4 block text-sm" htmlFor="pr">Max price: Rs. {f.max}</label><input id="pr" type="range" min="300" max="5000" step="100" value={f.max} onChange={e => setF({ ...f, max: +e.target.value })} className="w-full" />
      <label className="mt-3 flex min-h-[44px] items-center gap-2"><input type="checkbox" checked={f.verified} onChange={e => setF({ ...f, verified: e.target.checked })} />Verified sellers only</label>
      <button className="btn-cta mt-3 w-full" onClick={() => setSheet(false)}>Show {list.length} items</button></div></div>}
  </div>
}
