import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../store/useApp'
export default function Profile() {
  const { user, city, premium, tryOn, orders, set } = useApp(), nav = useNavigate()
  return <div className="space-y-3 p-3"><h1 className="text-xl font-bold">{user?.name || 'Guest'}</h1><p className="text-sm text-slate-600">{city}</p>
    <p className="rounded-xl bg-white p-3 shadow-card">Premium: <b>{premium ? 'Active' : 'Not active'}</b> · Try-on credits: <b>{tryOn.credits}</b> · Saved try-ons: <b>{tryOn.history.length}</b></p>
    {[['/orders', `My orders (${orders.length})`], ['/premium', 'Buyer Premium'], ['/wishlist', 'Wishlist']].map(([to, l]) => <Link key={to} to={to} className="flex min-h-[44px] items-center rounded-xl bg-white px-3 shadow-card">{l}</Link>)}
    <button className="btn-ghost w-full" onClick={() => { set({ user: null, city: null }); nav('/welcome') }}>Sign out</button>
    <p className="text-xs text-slate-600">Addresses, referral, notifications, privacy and image credits arrive in pass C.</p></div>
}
