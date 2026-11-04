import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CITIES } from '../data/mock'
import { useApp } from '../store/useApp'
export default function Onboarding() {
  const { set, lang, say } = useApp(), nav = useNavigate(), [step, setStep] = useState(0), [pin, setPin] = useState(''), [mail, setMail] = useState('')
  const hi = lang === 'hi', done = c => { set({ city: c }); setStep(2) }
  const byPin = () => { const c = CITIES.find(c => c.pins.some(p => pin.startsWith(p))); c ? done(c.name) : setStep('wait') }
  return <div className="mx-auto max-w-md p-5">
    <h1 className="mb-1 text-3xl font-bold text-brand">{hi ? 'Apne shehar ka hunar' : 'Handmade, from your city'}</h1>
    <p className="mb-6 text-slate-600">{hi ? 'Sirf aapke shehar ke makers.' : 'Shop local makers. Prepaid, protected.'}</p>
    {step === 0 && <><p className="mb-2 font-bold">Language</p><div className="flex gap-2">
      {[['en', 'English'], ['hi', 'Hindi']].map(([k, l]) => <button key={k} className={`chip ${lang === k ? 'border-brand bg-brand text-white' : ''}`} onClick={() => set({ lang: k })}>{l}</button>)}</div>
      <button className="btn-cta mt-6 w-full" onClick={() => setStep(1)}>Continue</button></>}
    {step === 1 && <><p className="mb-2 font-bold">Choose your city</p><div className="grid grid-cols-2 gap-2">
      {CITIES.map(c => <button key={c.name} className="btn-ghost" onClick={() => done(c.name)}>{c.name}</button>)}</div>
      <label className="mt-5 block text-sm font-bold" htmlFor="pin">Or enter pincode</label>
      <div className="flex gap-2"><input id="pin" inputMode="numeric" maxLength={6} value={pin} onChange={e => setPin(e.target.value)} className="min-h-[44px] flex-1 rounded-xl border px-3" placeholder="e.g. 302001" />
        <button className="btn-brand" disabled={pin.length < 6} onClick={byPin}>Check</button></div></>}
    {step === 2 && <><p className="mb-2 font-bold">Sign in</p>
      <button className="btn-ghost w-full" onClick={() => { set({ user: { name: 'Guest (Google, mock)' } }); nav('/') }}>Continue with Google</button>
      <label className="mt-4 block text-sm font-bold" htmlFor="em">Email</label>
      <input id="em" type="email" value={mail} onChange={e => setMail(e.target.value)} className="min-h-[44px] w-full rounded-xl border px-3" />
      <button className="btn-cta mt-3 w-full" onClick={() => { set({ user: { name: mail } }); nav('/') }}>Continue</button>
      <p className="mt-3 text-xs text-slate-600">Phone OTP is asked at first checkout (mock OTP 123456).</p></>}
    {step === 'wait' && <><h2 className="font-bold">Not live in your city yet</h2><p className="text-sm text-slate-600">Join the waitlist and we will tell you when makers near you go live.</p>
      <input aria-label="Email for waitlist" value={mail} onChange={e => setMail(e.target.value)} placeholder="Email" className="my-3 min-h-[44px] w-full rounded-xl border px-3" />
      <button className="btn-cta w-full" onClick={() => { say('You are on the waitlist'); setStep(1) }}>Join waitlist</button></>}
  </div>
}
