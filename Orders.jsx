import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import Img from '../components/Img'
import { rs, Empty } from '../components/Card'
import { PRICING as P } from '../config/pricing'
import { useApp } from '../store/useApp'
const STEPS = ['Placed', 'Seller packed', 'Shipped', 'Delivered']
function Detail({ o }) {
  const { upOrder, say } = useApp(), [form, setForm] = useState(false), [why, setWhy] = useState('Item not as described'), [files, setFiles] = useState(0), [star, setStar] = useState(0), [txt, setTxt] = useState('')
  const status = o.released ? 'Payment released to seller' : o.dispute ? `Payout paused, our team will review within ${P.disputes.reviewHours} hours` : o.stage === 3 ? `Payment auto-releases ${P.disputes.autoReleaseHours} hours after delivery unless you tap Received` : 'Payment is held safely by the platform'
  return <div className="space-y-4 p-3 pb-24"><h1 className="text-xl font-bold">Order {o.id}</h1>
    <ol className="rounded-2xl bg-white p-3 shadow-card">{STEPS.map((s, i) => <li key={s} className="flex min-h-[44px] items-center gap-2"><span className={`grid h-6 w-6 place-items-center rounded-full ${i <= o.stage ? 'bg-brand text-white' : 'bg-slate-200'}`}>{i <= o.stage && <Check size={14} />}</span>{s}</li>)}</ol>
    {o.stage >= 2 && <div className="rounded-2xl bg-white p-3 shadow-card"><a className="font-bold text-brand underline" href="#track" onClick={e => { e.preventDefault(); say('Opens seller tracking link (mock)') }}>Track shipment</a><Img q="packed parcel handmade" alt="Packing photo from seller" ratio="16/9" className="mt-2 rounded-xl" /></div>}
    {o.rows.map((r, i) => <p key={i} className="text-sm">{r.qty} x {r.name} · {rs(r.price)}</p>)}<p className="font-bold">Total {rs(o.total)}</p>
    <p role="status" className="rounded-xl bg-brand-soft p-3 text-sm font-medium">{status}</p>
    {o.stage < 3 && <button className="btn-ghost w-full" onClick={() => upOrder(o.id, { stage: o.stage + 1 })}>Demo: advance order (acts as the seller)</button>}
    {o.stage === 3 && !o.released && !o.dispute && <button className="btn-cta w-full" onClick={() => { upOrder(o.id, { released: true }); say('Payment released to seller') }}>Received</button>}
    {o.stage === 3 && !o.dispute && <button className="btn-ghost w-full" onClick={() => setForm(true)}>Raise a concern</button>}
    {o.stage === 3 && !o.returnReq && <button className="btn-ghost w-full" onClick={() => { upOrder(o.id, { returnReq: true }); say('Return requested') }}>Request return ({P.disputes.returnWindowDays}-day window)</button>}
    {o.returnReq && <p className="text-sm font-medium">Return requested. The seller will confirm pickup.</p>}
    {form && <div className="space-y-2 rounded-2xl bg-white p-3 shadow-card"><label htmlFor="why" className="font-bold">Reason</label>
      <select id="why" value={why} onChange={e => setWhy(e.target.value)} className="min-h-[44px] w-full rounded-xl border px-2">{['Item not as described', 'Damaged in transit', 'Wrong item', 'Not received'].map(x => <option key={x}>{x}</option>)}</select>
      <label htmlFor="ph" className="block text-sm">Photos</label><input id="ph" type="file" accept="image/*" multiple onChange={e => setFiles(e.target.files.length)} />
      <button className="btn-cta w-full" onClick={() => { upOrder(o.id, { dispute: { why, files } }); setForm(false) }}>Submit concern</button></div>}
    {o.stage === 3 && (o.review ? <p className="text-sm">Your review: {o.review.star} stars. {o.review.txt}</p> : <div className="space-y-2 rounded-2xl bg-white p-3 shadow-card"><h2 className="font-bold">Rate and review</h2>
      <div className="flex">{[1, 2, 3, 4, 5].map(n => <button key={n} aria-label={`${n} stars`} aria-pressed={star === n} className={`h-11 w-11 rounded-full ${star >= n ? 'bg-gold' : 'bg-slate-100'}`} onClick={() => setStar(n)}>{n}</button>)}</div>
      <input aria-label="Review" value={txt} onChange={e => setTxt(e.target.value)} placeholder="Tell others about it" className="min-h-[44px] w-full rounded-xl border px-3" />
      <button className="btn-brand w-full" onClick={() => star ? upOrder(o.id, { review: { star, txt } }) : say('Pick a rating')}>Submit review</button></div>)}
  </div>
}
export default function Orders() {
  const { id } = useParams(), { orders } = useApp()
  if (id) { const o = orders.find(x => x.id === id); return o ? <Detail o={o} /> : <Empty t="Order not found" d="Check your orders list." /> }
  return orders.length ? <div className="space-y-3 p-3"><h1 className="text-xl font-bold">Orders</h1>{orders.map(o => <Link key={o.id} to={'/orders/' + o.id} className="block rounded-2xl bg-white p-3 shadow-card"><b>{o.id}</b> · {rs(o.total)}<br /><span className="text-sm text-slate-600">{STEPS[o.stage]}</span></Link>)}</div>
    : <Empty t="No orders yet" d="Your orders will appear here." />
}
