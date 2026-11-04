import { create } from 'zustand'
const tog = (a, x) => (a.includes(x) ? a.filter(i => i !== x) : [...a, x])
export const useApp = create((set, get) => ({
  lang: 'en', city: null, user: null, wish: [], cart: [], follows: [], premium: false, toast: null, waitlist: [],
  orders: [], chats: {}, verified: false, tryOn: { used: 0, credits: 0, videos: 0, history: [] },
  set: p => set(p),
  say: m => { set({ toast: m }); setTimeout(() => set({ toast: null }), 2200) },
  toggleWish: id => set(s => ({ wish: tog(s.wish, id) })),
  toggleFollow: id => set(s => ({ follows: tog(s.follows, id) })),
  addCart: (pid, opt) => { set(s => ({ cart: [...s.cart, { pid, ...opt, qty: 1 }] })); get().say('Added to cart') },
  upOrder: (id, p) => set(s => ({ orders: s.orders.map(o => (o.id === id ? { ...o, ...p } : o)) })),
}))
