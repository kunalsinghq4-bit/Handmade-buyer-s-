import React, { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { useApp } from './store/useApp'
import Shell from './components/Shell'
const Onboarding = lazy(() => import('./features/Onboarding'))
const Home = lazy(() => import('./features/Home'))
const Search = lazy(() => import('./features/Search'))
const Store = lazy(() => import('./features/Store'))
const Product = lazy(() => import('./features/Product'))
const Cart = lazy(() => import('./features/Cart'))
const TryOn = lazy(() => import('./features/TryOn'))
const Chat = lazy(() => import('./features/Chat'))
const Orders = lazy(() => import('./features/Orders'))
const Premium = lazy(() => import('./features/Premium'))
const Profile = lazy(() => import('./features/Profile'))
const Soon = ({ n }) => <div className="p-8 text-center"><h1 className="text-xl font-bold">Coming in pass {n}</h1></div>
function Gate({ children }) { return useApp(s => s.city) ? children : <Navigate to="/welcome" replace /> }
createRoot(document.getElementById('root')).render(
  <BrowserRouter><Suspense fallback={<div className="sk m-4 h-40" />}><Routes>
    <Route path="/welcome" element={<Onboarding />} />
    <Route element={<Gate><Shell /></Gate>}>
      <Route path="/" element={<Home />} /><Route path="/search" element={<Search />} />
      <Route path="/store/:id" element={<Store />} /><Route path="/p/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} /><Route path="/tryon/:id" element={<TryOn />} />
      <Route path="/chat/:id" element={<Chat />} /><Route path="/wishlist" element={<Search wishlist />} />
      <Route path="/orders" element={<Orders />} /><Route path="/orders/:id" element={<Orders />} />
      <Route path="/premium" element={<Premium />} /><Route path="/profile" element={<Profile />} />
    </Route></Routes></Suspense></BrowserRouter>)
