import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Img from '../components/Img'
import { PRODUCTS } from '../data/mock'
import { PRICING as P } from '../config/pricing'
import { useApp } from '../store/useApp'
import { rs, Empty } from '../components/Card'
export default function TryOn() {
  const { id } = useParams(), p = PRODUCTS.find(x => x.id === id), { tryOn, set, premium, say } = useApp(), T = P.tryOn
  const [step, setStep] = useState('consent'), [photo, setPhoto] = useState(null), [sheet, setSheet] = useState(false), [video, setVideo] = useState(false), [saved, setSaved] = useState(false)
  useEffect(() => () => { photo && URL.revokeObjectURL(photo) }, [photo])
  if (!p) return <Empty t="Product not found" d="" />
  const freeLeft = Math.max(0, T.freeImages + (premium ? P.premium.freeImagesPerMonth : 0) - tryOn.used), price = premium ? P.premium.tryOnPerImage : T.perImage
  const start = () => { setStep('loading'); setTimeout(() => setStep('result'), 2000) }
  const run = () => {
    if (freeLeft > 0) set(s => ({ tryOn: { ...s.tryOn, used: s.tryOn.used + 1 } }))
    else if (tryOn.credits > 0) set(s => ({ tryOn: { ...s.tryOn, credits: s.tryOn.credits - 1 } }))
    else return setSheet(true)
    start()
  }
  const vid = () => { if (tryOn.videos > 0) set(s => ({ tryOn: { ...s.tryOn, videos: s.tryOn.videos - 1 } })); else say(`${rs(T.video.min)} charged (mock)`); setVideo(true) }
  return <div className="space-y-4 p-3"><h1 className="text-xl font-bold">Try on: {p.name}</h1>
    <p className="text-sm">{freeLeft} free try-ons left · {tryOn.credits} credits</p>
    {step === 'consent' && <><p className="rounded-xl bg-brand-soft p-3 text-sm">We use your photo only to create this AI preview. Photo is deleted after this session.</p><button className="btn-cta w-full" onClick={() => setStep('upload')}>I agree</button></>}
    {step === 'upload' && <><label htmlFor="selfie" className="font-bold">Selfie or full-body photo</label><input id="selfie" type="file" accept="image/*" onChange={e => e.target.files[0] && setPhoto(URL.createObjectURL(e.target.files[0]))} />
      {photo && <img src={photo} alt="Your photo" className="h-48 rounded-xl" />}<button className="btn-cta w-full" disabled={!photo} onClick={run}>Create AI preview</button></>}
    {step === 'loading' && <div role="status" className="sk h-64 text-center leading-[16rem]">Creating your preview...</div>}
    {step === 'result' && <><div className="relative"><Img q={p.q} alt={`AI preview of ${p.name}`} ratio="4/5" className="rounded-2xl" /><span className="tag absolute left-2 top-2">AI preview</span>{p.sponsored && <span className="tag absolute right-2 top-2">Sponsored try-on</span>}</div>
      {video && <p className="rounded-xl bg-slate-100 p-3 text-sm">AI video preview ready (mock, no video file).</p>}
      <div className="grid grid-cols-2 gap-2"><button className="btn-ghost" disabled={saved} onClick={() => { set(s => ({ tryOn: { ...s.tryOn, history: [...s.tryOn.history, p.name] } })); setSaved(true); say('Saved to try-on history') }}>{saved ? 'Saved' : 'Save'}</button>
        <button className="btn-ghost" onClick={async () => { try { await navigator.clipboard.writeText(location.href); say('Link copied') } catch { say('Copy: ' + location.href) } }}>Share</button>
        <button className="btn-ghost" onClick={vid}>Video try-on ({rs(T.video.min)})</button><button className="btn-ghost" onClick={() => setStep('upload')}>Try again</button></div>
      <Link to={`/p/${p.id}`} className="btn-cta w-full">Back to product</Link></>}
    {sheet && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSheet(false)}><div role="dialog" aria-label="Buy credits" className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl space-y-2 rounded-t-3xl bg-white p-5" onClick={e => e.stopPropagation()}>
      <h2 className="font-bold">You have used your free try-ons</h2>
      <button className="btn-cta w-full" onClick={() => { setSheet(false); start() }}>Pay {rs(price)} for this try-on</button>
      {T.packs.map(k => <button key={k.id} className="btn-ghost w-full" onClick={() => { set(s => ({ tryOn: { ...s.tryOn, credits: s.tryOn.credits + k.images, videos: s.tryOn.videos + k.videos } })); setSheet(false); say('Pack added') }}>{k.images} images{k.videos ? ` + ${k.videos} video` : ''} for {rs(k.price)}</button>)}
      {!premium && <Link to="/premium" className="block min-h-[44px] text-center font-bold text-brand">Get cheaper try-ons with Premium</Link>}</div></div>}
  </div>
}
