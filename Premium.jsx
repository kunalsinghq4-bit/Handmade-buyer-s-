import { useState } from 'react'
import { PRICING as P } from '../config/pricing'
import { useApp } from '../store/useApp'
import { rs } from '../components/Card'
export default function Premium() {
  const { premium, set, say } = useApp(), [sheet, setSheet] = useState(false), pr = P.premium
  return <div className="space-y-4 p-3"><h1 className="text-2xl font-bold text-brand">Buyer Premium</h1>
    <ul className="list-disc space-y-1 pl-5"><li>{pr.freeImagesPerMonth} extra try-ons every month</li><li>Try-ons at {rs(pr.tryOnPerImage)} each instead of {rs(P.tryOn.perImage)}</li><li>Seller phone number and call unlocked</li></ul>
    <p className="text-xl font-bold">{rs(pr.monthly)} / month</p>
    {premium ? <><p role="status" className="rounded-xl bg-brand-soft p-3 font-bold">Premium is active</p><button className="btn-ghost w-full" onClick={() => { set({ premium: false }); say('Premium cancelled') }}>Cancel plan</button></>
      : <button className="btn-cta w-full" onClick={() => setSheet(true)}>Subscribe</button>}
    {sheet && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSheet(false)}><div role="dialog" aria-label="Pay for Premium" className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl space-y-2 rounded-t-3xl bg-white p-5" onClick={e => e.stopPropagation()}>
      <h2 className="font-bold">Pay {rs(pr.monthly)} (UPI, mock)</h2><button className="btn-cta w-full" onClick={() => { set({ premium: true }); setSheet(false); say('Welcome to Premium') }}>Pay now</button></div></div>}</div>
}
