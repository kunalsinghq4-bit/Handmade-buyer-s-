import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { ProductCard } from '../components/Card'
import { STORES, CATS } from '../data/mock'
import { PRICING } from '../config/pricing'
import { useApp } from '../store/useApp'
const StoreTile = ({ s, tag }) => <Link to={`/store/${s.id}`} className="block w-44 shrink-0 overflow-hidden rounded-2xl bg-white shadow-card">
  <Img q="handloom textile india" alt={s.name} ratio="4/3" /><div className="p-2"><p className="truncate font-bold">{s.name}</p>
  <p className="text-xs text-slate-600">{tag && <b className="text-gold-dark">Featured · </b>}{s.rating} stars (sample)</p></div></Link>
const Row = ({ t, children }) => <section className="mt-6"><h2 className="px-3 pb-2 text-lg font-bold">{t}</h2><div className="flex gap-3 overflow-x-auto px-3 pb-1">{children}</div></section>
export default function Home() {
  const city = useApp(s => s.city), mine = STORES.filter(s => s.city === city), prods = mine.flatMap(s => s.products)
  return <div>
    <div className="relative m-3 overflow-hidden rounded-2xl bg-brand p-5 text-white"><p className="text-sm">{city}</p>
      <h1 className="text-2xl font-bold">{PRICING.flags.festivalBanner && PRICING.festival ? `${PRICING.festival} gifts from local makers` : `Made in ${city}`}</h1></div>
    <div className="flex gap-2 overflow-x-auto px-3">{CATS.map(c => <Link key={c} to={`/search?cat=${c}`} className="chip">{c}</Link>)}</div>
    <Row t="Featured stores">{mine.filter(s => s.featured).concat(mine.slice(1, 2)).map(s => <StoreTile key={s.id} s={s} tag />)}</Row>
    <Row t="Stores near you">{mine.map(s => <StoreTile key={s.id} s={s} />)}</Row>
    <section className="mt-6"><h2 className="px-3 pb-2 text-lg font-bold">New from makers</h2><div className="grid grid-cols-2 gap-3 px-3">{prods.filter(p => p.isNew).map(p => <ProductCard key={p.id} p={p} />)}</div></section>
    <section className="mt-6"><h2 className="px-3 pb-2 text-lg font-bold">Trending in {city}</h2><div className="grid grid-cols-2 gap-3 px-3">{prods.slice(0, 6).map(p => <ProductCard key={p.id} p={p} />)}</div></section>
  </div>
}
