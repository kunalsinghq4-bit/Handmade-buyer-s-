import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Search, MapPin, Home, LayoutGrid, User } from 'lucide-react'
import { useApp } from '../store/useApp'
export default function Shell() {
  const { city, cart, wish, toast } = useApp(), nav = useNavigate()
  const tabs = [['/', Home, 'Home'], ['/search', LayoutGrid, 'Categories'], ['/wishlist', Heart, 'Wishlist'], ['/cart', ShoppingBag, 'Cart'], ['/profile', User, 'Profile']]
  return <div className="mx-auto min-h-screen max-w-3xl pb-20">
    <header className="sticky top-0 z-30 flex items-center gap-2 bg-white/95 p-2 shadow-card backdrop-blur">
      <button className="flex min-h-[44px] items-center gap-1 font-bold text-brand" aria-label="Change city" onClick={() => nav('/welcome')}><MapPin size={18} />{city}</button>
      <button className="flex min-h-[44px] flex-1 items-center gap-2 rounded-xl bg-slate-100 px-3 text-left text-sm text-slate-600" onClick={() => nav('/search')}><Search size={18} />Search handmade in {city}</button>
      <Link to="/wishlist" aria-label={`Wishlist, ${wish.length} items`} className="grid h-11 w-11 place-items-center"><Heart /></Link>
      <Link to="/cart" aria-label={`Cart, ${cart.length} items`} className="relative grid h-11 w-11 place-items-center"><ShoppingBag />
        {cart.length > 0 && <b className="absolute right-1 top-1 rounded-full bg-gold px-1.5 text-[10px]">{cart.length}</b>}</Link>
    </header>
    <main><Outlet /></main>
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-3xl border-t bg-white md:hidden">
      {tabs.map(([to, I, l]) => <NavLink key={l} to={to} end className={({ isActive }) => `flex min-h-[56px] flex-1 flex-col items-center justify-center text-[11px] ${isActive ? 'font-bold text-brand' : 'text-slate-600'}`}><I size={22} />{l}</NavLink>)}
    </nav>
    {toast && <div role="status" className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white">{toast}</div>}
  </div>
}
