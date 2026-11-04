import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Lock, Phone, Play } from 'lucide-react'
import Img from '../components/Img'
import { ProductCard, Empty } from '../components/Card'
import { STORES, REVIEWS } from '../data/mock'
import { useApp } from '../store/useApp'
export default function Store() {
  const { id } = useParams(), s = STORES.find(x => x.id === id), { follows, toggleFollow, premium, say } = useApp(), nav = useNavigate(), [tab, setTab] = useState('Catalogue'), [vid, setVid] = useState(false)
  if (!s) return <Empty t="Store not found" d="It may have moved." />
  return <div>
    <Img q="handloom textile india" alt={s.name + ' cover'} ratio="16/7" />
    <div className="-mt-8 px-3"><div className="w-16 overflow-hidden rounded-2xl border-4 border-white shadow-card"><Img q="handmade craft studio" alt="" /></div>
      <h1 className="mt-2 flex items-center gap-1 text-xl font-bold">{s.name}{s.verified && <BadgeCheck className="text-brand" aria-label="Verified seller" />}</h1>
      <p className="text-sm text-slate-600">{s.city} · {s.rating} stars from {s.reviews} reviews (sample data)</p>
      <div className="my-3 grid grid-cols-3 gap-2">
        <button className="btn-brand" onClick={() => nav(`/chat/${s.id}`)}>Chat free</button>
        {premium ? <button className="btn-ghost" onClick={() => say('Calling +91 98xxxxxx10 (mock)')}><Phone size={16} />Call</button>
          : <button className="btn-ghost" onClick={() => nav('/premium')}><Lock size={16} />Call</button>}
        <button aria-pressed={follows.includes(s.id)} className={follows.includes(s.id) ? 'btn bg-brand-soft text-brand' : 'btn-ghost'} onClick={() => toggleFollow(s.id)}>{follows.includes(s.id) ? 'Following' : 'Follow'}</button></div>
      {!premium && <p className="text-xs text-slate-600">Unlock seller contact with Premium. Chat is always free.</p>}
      <button className="mt-3 flex min-h-[44px] w-full items-center gap-2 rounded-xl bg-slate-900 px-4 text-white" onClick={() => setVid(!vid)}><Play size={18} />Catalogue video</button>
      {vid && <div className="mt-2 grid aspect-video place-items-center rounded-xl bg-slate-200 text-sm">Sample video player (mock, no file)</div>}
      <div role="tablist" className="mt-4 flex border-b">{['Catalogue', 'Story', 'Reviews'].map(t => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`min-h-[44px] flex-1 font-bold ${tab === t ? 'border-b-2 border-brand text-brand' : 'text-slate-600'}`}>{t}</button>)}</div>
      <div className="py-3">{tab === 'Catalogue' && <div className="grid grid-cols-2 gap-3">{s.products.map(p => <ProductCard key={p.id} p={p} />)}</div>}
        {tab === 'Story' && <p>{s.story}</p>}
        {tab === 'Reviews' && REVIEWS.map(r => <p key={r.n} className="mb-2 rounded-xl bg-white p-3 shadow-card"><b>{r.n}</b> · {r.r} stars (sample)<br />{r.t}</p>)}</div></div></div>
}
