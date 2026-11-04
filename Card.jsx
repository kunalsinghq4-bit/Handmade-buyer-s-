import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Img from './Img'
import { useApp } from '../store/useApp'
export function Wish({ id }) {
  const { wish, toggleWish } = useApp(), on = wish.includes(id), [k, setK] = useState(0)
  return <button aria-label={on ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={on} onClick={e => { e.preventDefault(); setK(k + 1); toggleWish(id) }}
    className="absolute right-1 top-1 z-10 grid h-11 w-11 place-items-center"><span key={k} className={on ? 'pop' : ''}><Heart fill={on ? '#E11D48' : 'rgba(255,255,255,.7)'} color={on ? '#E11D48' : '#334155'} /></span></button>
}
export const rs = n => 'Rs. ' + n.toLocaleString('en-IN')
export function ProductCard({ p }) {
  return <Link to={`/p/${p.id}`} className="relative block overflow-hidden rounded-2xl bg-white shadow-card">
    <Img q={p.q} alt={p.name} ratio="4/5" /><Wish id={p.id} />
    {p.sponsored && <span className="tag absolute left-2 top-2">Sponsored</span>}
    <div className="p-3"><p className="truncate text-sm font-medium">{p.name}</p>
      <p className="font-bold">{rs(p.price)} <s className="text-xs font-normal text-slate-500">{rs(p.mrp)}</s></p>
      <p className="text-xs text-slate-600">{p.rating} stars (sample)</p></div></Link>
}
export const Skeleton = () => <div className="grid grid-cols-2 gap-3 p-3">{[0, 1, 2, 3].map(i => <div key={i} className="sk h-60" />)}</div>
export const Empty = ({ t, d }) => <div className="p-10 text-center"><h2 className="font-bold">{t}</h2><p className="text-sm text-slate-600">{d}</p></div>
