import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Lock, ImagePlus, Send } from 'lucide-react'
import { STORES, PRODUCTS } from '../data/mock'
import { rs, Empty } from '../components/Card'
import { useApp } from '../store/useApp'
const REPLIES = ['Yes, it is available. Which size or colour would you like?', 'I can ship within 2 days via Porter.', 'Happy to share more photos. Please order on the app so you stay protected.']
export default function Chat() {
  const { id } = useParams(), s = STORES.find(x => x.id === id), { chats, set, premium } = useApp(), nav = useNavigate(), [sp] = useSearchParams(), [t, setT] = useState(''), end = useRef()
  const p = PRODUCTS.find(x => x.id === sp.get('p')), msgs = chats[id] || []
  const push = m => set(st => ({ chats: { ...st.chats, [id]: [...(st.chats[id] || []), m] } }))
  useEffect(() => { if (s && !msgs.length) push({ from: 's', t: `Namaste! Welcome to ${s.name}. How can I help?` }) }, [id])
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs.length])
  if (!s) return <Empty t="Chat not found" d="" />
  const reply = () => setTimeout(() => push({ from: 's', t: REPLIES[useApp.getState().chats[id].length % REPLIES.length] }), 900)
  const send = () => { if (!t.trim()) return; push({ from: 'u', t }); setT(''); reply() }
  return <div className="flex min-h-[calc(100vh-130px)] flex-col"><div className="sticky top-[60px] z-20 bg-brand-soft p-2 text-sm">
    <p className="font-bold">{s.name}</p><p>Pay only through the platform to stay protected.</p>
    {premium ? <span className="chip mt-1">+91 98xxxxxx10</span> : <button className="chip mt-1 gap-1" onClick={() => nav('/premium')}><Lock size={14} />Unlock seller contact with Premium</button>}</div>
    <div className="flex-1 space-y-2 p-3">{p && <Link to={`/p/${p.id}`} className="block rounded-xl bg-white p-3 shadow-card text-sm"><b>{p.name}</b> · {rs(p.price)}</Link>}
      {msgs.map((m, i) => <div key={i} className={`flex ${m.from === 'u' ? 'justify-end' : ''}`}><div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === 'u' ? 'bg-brand text-white' : 'bg-white shadow-card'}`}>{m.img ? <img src={m.img} alt="Shared" className="rounded-lg" /> : m.t}</div></div>)}<div ref={end} /></div>
    <div className="sticky bottom-14 flex gap-1 border-t bg-white p-2 md:bottom-0"><label aria-label="Share image" className="grid h-11 w-11 cursor-pointer place-items-center"><ImagePlus /><input type="file" accept="image/*" className="sr-only" onChange={e => { const f = e.target.files[0]; if (f) { push({ from: 'u', img: URL.createObjectURL(f) }); reply() } }} /></label>
      <input aria-label="Message" value={t} onChange={e => setT(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Message" className="min-h-[44px] flex-1 rounded-xl border px-3" />
      <button aria-label="Send" className="grid h-11 w-11 place-items-center text-brand" onClick={send}><Send /></button></div></div>
}
