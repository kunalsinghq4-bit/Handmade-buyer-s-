import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS, STORES, CITIES } from '../data/mock'
import { PRICING as P } from '../config/pricing'
import { useApp } from '../store/useApp'
import { rs, Empty } from '../components/Card'
export const calcFee = sub => Math.max(P.fee.min, Math.round(sub * P.fee.pct / 100))
export default function Cart() {
  const { cart, set, city, say, verified } = useApp(), nav = useNavigate()
  const [pin, setPin] = useState(''), [addr, setAddr] = useState(''), [gp, setGp] = useState(false), [gw, setGw] = useState(false), [msg, setMsg] = useState('')
  const [code, setCode] = useState(''), [cp, setCp] = useState(null), [method, setMethod] = useState('upi'), [step, setStep] = useState(''), [otp, setOtp] = useState(''), [fail, setFail] = useState(false)
  const rows = cart.map((c, i) => ({ ...c, i, p: PRODUCTS.find(x => x.id === c.pid) }))
  if (!rows.length) return <Empty t="Your cart is empty" d="Add something handmade from your city." />
  const sids = [...new Set(rows.map(r => r.p.storeId))]
  const items = rows.reduce((a, r) => a + r.p.price * r.qty, 0), delivery = P.delivery * sids.length
  const add = (gp ? P.addons.deliveryProtection * sids.length : 0) + (gw ? P.addons.giftWrap : 0)
  const disc = cp ? (cp.pct ? Math.round(items * cp.pct / 100) : Math.min(cp.flat, items)) : 0
  const fee = calcFee(items), total = items + delivery + add - disc + fee
  const pinOk = pin.length === 6 && CITIES.find(c => c.name === city).pins.some(p => pin.startsWith(p))
  const qty = (i, d) => set(s => ({ cart: s.cart.map((c, j) => (j === i ? { ...c, qty: Math.max(1, c.qty + d) } : c)) }))
  const apply = () => { const c = P.coupons[code.trim().toUpperCase()]; if (c) { setCp(c); say('Coupon applied') } else say('Invalid code') }
  const go = () => (!pinOk || addr.length < 5) ? say(`Enter address and a valid ${city} pincode`) : setStep(verified ? 'pay' : 'otp')
  const pay = ok => {
    if (!ok) return setFail(true)
    const id = 'ORD' + Date.now().toString().slice(-6)
    set(s => ({ cart: [], orders: [{ id, rows: rows.map(r => ({ name: r.p.name, q: r.p.q, size: r.size, price: r.p.price, qty: r.qty })), total, fee, stage: 0, released: false, dispute: null, returnReq: false, review: null }, ...s.orders] }))
    say('Payment successful. Order placed'); nav('/orders/' + id)
  }
  const Row = ([l, v, b]) => <div key={l} className={`flex justify-between ${b ? 'border-t pt-2 font-bold' : 'text-sm'}`}><span>{l}</span><span>{v}</span></div>
  return <div className="space-y-4 p-3 pb-28"><h1 className="text-xl font-bold">Cart</h1>
    {sids.map(sid => <section key={sid} className="rounded-2xl bg-white p-3 shadow-card"><h2 className="mb-2 font-bold">{STORES.find(s => s.id === sid).name}</h2>
      {rows.filter(r => r.p.storeId === sid).map(r => <div key={r.i} className="flex items-center justify-between border-t py-2"><div><p className="text-sm font-medium">{r.p.name}</p><p className="text-xs text-slate-600">{[r.size, r.col].filter(Boolean).join(' · ')} · {rs(r.p.price)}</p></div>
        <div className="flex items-center"><button aria-label="Decrease quantity" className="h-11 w-11" onClick={() => qty(r.i, -1)}>-</button><span>{r.qty}</span><button aria-label="Increase quantity" className="h-11 w-11" onClick={() => qty(r.i, 1)}>+</button>
          <button className="min-h-[44px] px-2 text-sm text-red-700" onClick={() => set(s => ({ cart: s.cart.filter((_, j) => j !== r.i) }))}>Remove</button></div></div>)}</section>)}
    <section className="space-y-2 rounded-2xl bg-white p-3 shadow-card"><h2 className="font-bold">Delivery address ({city})</h2>
      <input aria-label="Address" value={addr} onChange={e => setAddr(e.target.value)} placeholder="House, street, area" className="min-h-[44px] w-full rounded-xl border px-3" />
      <input aria-label="Pincode" inputMode="numeric" maxLength={6} value={pin} onChange={e => setPin(e.target.value)} placeholder="Pincode" className="min-h-[44px] w-full rounded-xl border px-3" />
      {pin.length === 6 && <p className={`text-sm ${pinOk ? 'text-green-800' : 'text-red-700'}`}>{pinOk ? 'We deliver here' : `Not in ${city}. Sellers deliver within their city only.`}</p>}</section>
    <section className="rounded-2xl bg-white p-3 shadow-card"><h2 className="font-bold">Add-ons</h2>
      <label className="flex min-h-[44px] items-center gap-2"><input type="checkbox" checked={gp} onChange={e => setGp(e.target.checked)} />Delivery protection for fragile items ({rs(P.addons.deliveryProtection)} per store)</label>
      <label className="flex min-h-[44px] items-center gap-2"><input type="checkbox" checked={gw} onChange={e => setGw(e.target.checked)} />Gift wrap ({rs(P.addons.giftWrap)})</label>
      {gw && <input aria-label="Gift card message" maxLength={120} value={msg} onChange={e => setMsg(e.target.value)} placeholder="Gift card message" className="min-h-[44px] w-full rounded-xl border px-3" />}</section>
    <section className="flex gap-2"><input aria-label="Coupon or referral code" value={code} onChange={e => setCode(e.target.value)} placeholder="Coupon or referral code" className="min-h-[44px] flex-1 rounded-xl border px-3" /><button className="btn-ghost" onClick={apply}>Apply</button></section>
    <section className="space-y-2 rounded-2xl bg-white p-3 shadow-card">{[['Items', rs(items)], ['Delivery', rs(delivery)], ['Add-ons', rs(add)], disc ? ['Discount', '- ' + rs(disc)] : null,
      ['Platform and protection fee (GST included)', rs(fee)], ['Total', rs(total), 1]].filter(Boolean).map(Row)}
      <p className="text-xs text-slate-600">Includes payment protection and 7-day dispute support. Prepaid only.</p></section>
    <div className="fixed inset-x-0 bottom-14 mx-auto max-w-3xl border-t bg-white p-2 md:bottom-0"><button className="btn-cta w-full" onClick={go}>Pay {rs(total)}</button></div>
    {step && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setStep('')}><div role="dialog" aria-label="Payment" className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl space-y-3 rounded-t-3xl bg-white p-5" onClick={e => e.stopPropagation()}>
      {step === 'otp' ? <><h2 className="font-bold">Verify phone</h2><label htmlFor="otp" className="text-sm">Enter OTP (mock: 123456)</label>
        <input id="otp" inputMode="numeric" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} className="min-h-[44px] w-full rounded-xl border px-3" />
        <button className="btn-cta w-full" onClick={() => otp === '123456' ? (set({ verified: true }), setStep('pay')) : say('Wrong OTP')}>Verify</button></>
        : <><h2 className="font-bold">Pay {rs(total)}</h2><div className="flex gap-2">{[['upi', 'UPI'], ['card', 'Card']].map(([k, l]) => <button key={k} aria-pressed={method === k} className={`chip ${method === k ? 'border-brand bg-brand text-white' : ''}`} onClick={() => setMethod(k)}>{l}</button>)}</div>
          <input aria-label={method === 'upi' ? 'UPI ID' : 'Card number'} placeholder={method === 'upi' ? 'name@upi' : 'Card number (mock)'} className="min-h-[44px] w-full rounded-xl border px-3" />
          {fail && <p role="alert" className="text-sm text-red-700">Payment failed. You were not charged. Try again.</p>}
          <button className="btn-cta w-full" onClick={() => pay(true)}>Pay now</button><button className="btn-ghost w-full" onClick={() => pay(false)}>Simulate failed payment</button></>}</div></div>}
  </div>
}
