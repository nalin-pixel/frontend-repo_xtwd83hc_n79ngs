import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ProductGrid from './ProductGrid'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CategoryPage() {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const [data, setData] = useState({ items: [], total: 0 })

  const page = Number(params.get('page') || 1)
  const power = params.get('power') || ''

  useEffect(() => {
    const qs = new URLSearchParams({ page, page_size: 12 })
    if (power) qs.set('power_source', power)
    fetch(`${API}/api/products?category=${slug}&${qs.toString()}`)
      .then(r => r.json())
      .then(setData)
  }, [slug, page, power])

  const totalPages = Math.max(1, Math.ceil(data.total / 12))

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-extrabold mb-4">{slug?.replace('-', ' ')} </h1>

        <div className="flex gap-3 items-center mb-4 text-sm">
          <label>Power source</label>
          <select
            value={power}
            onChange={(e) => { params.set('power', e.target.value); params.set('page', '1'); setParams(params) }}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="petrol">Petrol</option>
            <option value="battery">Battery</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <ProductGrid title="" products={data.items} cta="" to="#" />

        <div className="flex items-center justify-center gap-2 mt-4">
          <button disabled={page<=1} className="px-3 py-1 rounded border disabled:opacity-50" onClick={() => { params.set('page', String(page-1)); setParams(params) }}>Prev</button>
          <span className="text-sm">Page {page} of {totalPages}</span>
          <button disabled={page>=totalPages} className="px-3 py-1 rounded border disabled:opacity-50" onClick={() => { params.set('page', String(page+1)); setParams(params) }}>Next</button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
