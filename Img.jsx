import { useEffect, useState } from 'react'
const KEY = import.meta.env.VITE_UNSPLASH_KEY
export function useUnsplash(q) {
  const [u, setU] = useState(null)
  useEffect(() => {
    if (!KEY || !q) return
    const k = 'us:' + q, c = sessionStorage.getItem(k)
    if (c) return setU(JSON.parse(c))
    fetch(`https://api.unsplash.com/search/photos?per_page=1&query=${encodeURIComponent(q)}&client_id=${KEY}`)
      .then(r => r.json()).then(d => { const p = d.results?.[0]; if (!p) return
        const v = { src: p.urls.raw + '&auto=format&fit=crop&w=800&q=80', by: p.user.name }
        sessionStorage.setItem(k, JSON.stringify(v)); setU(v) }).catch(() => {})
  }, [q]); return u
}
// aspect-ratio box + blur-up + soft colour block fallback (no layout shift)
export default function Img({ q, alt, ratio = '1/1', className = '' }) {
  const u = useUnsplash(q), [ok, setOk] = useState(true), [on, setOn] = useState(false)
  return <div className={`relative overflow-hidden bg-brand-soft ${className}`} style={{ aspectRatio: ratio }}>
    {u && ok ? <img src={u.src} alt={alt} loading="lazy" onLoad={() => setOn(true)} onError={() => setOk(false)}
      className={`h-full w-full object-cover transition duration-500 ${on ? '' : 'blur-md'}`} />
      : <div className="grid h-full place-items-center p-2 text-center text-sm font-medium text-brand/70">{alt}</div>}
  </div>
}
