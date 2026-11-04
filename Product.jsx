import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShieldCheck, Share2, Truck, Sparkles } from 'lucide-react'
import Img from '../components/Img'
import { Wish, rs, Empty } from '../components/Card'
import { PRODUCTS, STORES, REVIEWS } from '../data/mock'
import { PRICING } from '../config/pricing'
import { useApp } from '../store/useApp'
export default function Product() {
  const { id } = useParams(), p = PRODUCTS.find(x => x.id === id), { addCart, say } = useApp(), [size, setSize] = useState(''), [col, setCol] = useState('Indigo'), [zoom, setZoom] = useState(null), [sheet, setSheet] = useState(false)
  if (!p) return <Empty t="Product not found" d="This link may be old." />
  const s = STORES.find(x => x.id === p.storeId), views = ['', ' detail', ' worn']
  const add = () => p.sizes.length && !size ? setSheet(true) : addCart(p.id, { size, col })
  const share = async () => { try { await navigator.clipboard.writeText(location.href); say('Link copied') } catch { say('Copy: ' + location.href) } }
  return <div className="pb-24">
    <div className="relative"><div className="flex snap-x snap-mandatory overflow-x-auto">{views.map((v, i) => <button key={i} aria-label="Zoom image" className="w-full shrink-0 snap-center overflow-hidden" onClick={() => setZoom(zoom === i ? null : i)}>
      <div className={`transition duration-300 ${zoom === i ? 'scale-[2]' : ''}`}><Img q={p.q + v} alt={p.name + v} ratio="4/5" /></div></button>)}</div><Wish id={p.id} />
      {p.sponsored && <span className="tag absolute left-2 top-2">Sponsored</span>}</div>
    <div className="space-y-4 p-3">
      <div><h1 className="text-xl font-bold">{p.name}</h1><p className="text-2xl font-bold">{rs(p.price)} <s className="text-base font-normal text-slate-500">{rs(p.mrp)}</s></p><p className="text-xs text-slate-600">Platform and protection fee shown at checkout ({PRICING.fee.pct}%, min Rs. {PRICING.fee.min}).</p></div>
      <div><p className="mb-1 font-bold">Colour</p><div className="flex gap-2">{p.colours.map(c => <button key={c} aria-pressed={col === c} className={`chip ${col === c ? 'border-brand bg-brand text-white' : ''}`} onClick={() => setCol(c)}>{c}</button>)}</div></div>
      {p.sizes.length > 0 && <div><p className="mb-1 font-bold">Size</p><div className="flex gap-2">{p.sizes.map(z => <button key={z} aria-pressed={size === z} className={`chip ${size === z ? 'border-brand bg-brand text-white' : ''}`} onClick={() => setSize(z)}>{z}</button>)}</div></div>}
      <div className="flex items-center gap-2 rounded-xl bg-brand-soft p-3 text-sm"><ShieldCheck className="shrink-0 text-brand" />Includes payment protection and 7-day dispute support.</div>
      <p className="flex items-center gap-2 text-sm"><Truck size={18} />Seller ships via Porter within {s.city}.</p>
      {PRICING.flags.tryOn && <Link to={`/tryon/${p.id}`} className="btn-ghost w-full"><Sparkles size={18} />Try on yourself ({PRICING.tryOn.freeImages} free)</Link>}
      <Link to={`/store/${s.id}`} className="block rounded-2xl bg-white p-3 shadow-card"><b>{s.name}</b> · {s.city}<br /><span className="text-sm text-slate-600">{s.verified ? 'Verified seller · ' : ''}{s.rating} stars (sample)</span></Link>
      <Link to={`/chat/${s.id}?p=${p.id}`} className="btn-ghost w-full">Chat with seller (free)</Link>
      <button className="btn-ghost w-full" onClick={share}><Share2 size={18} />Share product link</button>
      <section><h2 className="mb-2 font-bold">Reviews</h2>{REVIEWS.map(r => <p key={r.n} className="mb-2 rounded-xl bg-white p-3 shadow-card"><b>{r.n}</b> <span className="text-xs text-green-800">Verified purchase</span> · {r.r} stars (sample)<br />{r.t}</p>)}</section></div>
    <div className="fixed inset-x-0 bottom-14 z-20 mx-auto flex max-w-3xl gap-2 border-t bg-white p-2 md:bottom-0"><button className="btn-cta flex-1" onClick={add}>Add to cart</button></div>
    {sheet && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSheet(false)}><div role="dialog" aria-label="Select size" className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl rounded-t-3xl bg-white p-5" onClick={e => e.stopPropagation()}>
      <h2 className="mb-3 font-bold">Select a size</h2><div className="flex gap-2">{p.sizes.map(z => <button key={z} className="chip" onClick={() => { setSize(z); setSheet(false); addCart(p.id, { size: z, col }) }}>{z}</button>)}</div></div></div>}
  </div>
}
