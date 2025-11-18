import { useEffect, useState } from 'react'
import Header from './Header'
import ProductGrid from './ProductGrid'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Homepage() {
  const [brands, setBrands] = useState([])
  const [best, setBest] = useState([])

  useEffect(() => {
    fetch(`${API}/api/brands`).then(r => r.json()).then(setBrands).catch(() => setBrands([]))
    fetch(`${API}/api/products?page=1&page_size=8`).then(r => r.json()).then(d => setBest(d.items || [])).catch(() => setBest([]))
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <section className="bg-gradient-to-br from-slate-100 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Power tools and equipment that just work</h1>
          <p className="mt-2 text-slate-600 max-w-2xl">Fast, simple shopping for tradies and DIY. Browse generators, pressure washers, garden tools and more from Hyundai, JCB and leading brands.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/categories/generators" className="px-4 py-2 rounded-lg bg-black text-white">Shop Generators</Link>
            <Link to="/deals" className="px-4 py-2 rounded-lg border">Deals & Clearance</Link>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3">Shop by brand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {brands.map((b) => (
              <Link key={b.slug} to={`/brand/${b.slug}`} className="rounded-xl border p-4 sm:p-6 bg-white hover:shadow-md transition-shadow">
                <div className="h-10 sm:h-14 mb-3 flex items-center">
                  <span className="text-xl sm:text-2xl font-extrabold" style={{color: b.slug === 'hyundai' ? '#1e40af' : b.slug === 'jcb' ? '#cc9900' : '#0f172a'}}>{b.name}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">Explore {b.name} range</p>
              </Link>
            ))}
            {!brands.length && (
              <div className="col-span-2 sm:col-span-4 text-sm text-slate-500">Loading brands…</div>
            )}
          </div>
        </div>
      </section>

      <ProductGrid title="Bestsellers" products={best} to="/bestsellers" />

      <section className="py-8 sm:py-12 bg-slate-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-4">Seasonal categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            <Link to="/categories/pressure-washers" className="rounded-xl overflow-hidden bg-white border">
              <div className="aspect-[4/3] bg-[url('https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM0MTE5NzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover"/>
              <div className="p-3 sm:p-4 font-semibold">Pressure Washers</div>
            </Link>
            <Link to="/categories/generators" className="rounded-xl overflow-hidden bg-white border">
              <div className="aspect-[4/3] bg-[url('https://images.unsplash.com/photo-1547234935-80c7145ec969?w=900')] bg-cover"/>
              <div className="p-3 sm:p-4 font-semibold">Generators</div>
            </Link>
            <Link to="/categories/chainsaws" className="rounded-xl overflow-hidden bg-white border">
              <div className="aspect-[4/3] bg-[url('https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM0MTE5NzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover"/>
              <div className="p-3 sm:p-4 font-semibold">Chainsaws</div>
            </Link>
            <Link to="/categories/clearance" className="rounded-xl overflow-hidden bg-white border">
              <div className="aspect-[4/3] bg-[url('https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM0MTE5NzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover"/>
              <div className="p-3 sm:p-4 font-semibold">Clearance</div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
