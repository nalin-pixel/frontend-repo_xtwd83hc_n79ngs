import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Star, Plus, Minus } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductPage() {
  const { sku } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [reviews, setReviews] = useState({ items: [], total: 0 })

  useEffect(() => {
    fetch(`${API}/api/products/${sku}`).then(r => r.json()).then(setProduct)
    fetch(`${API}/api/products/${sku}/reviews`).then(r => r.json()).then(setReviews)
  }, [sku])

  if (!product) return <div className="min-h-screen bg-white"><Header /><div className="max-w-7xl mx-auto p-6">Loading…</div></div>

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="text-sm text-slate-500 mb-4">{product.brand?.toUpperCase()} / {product.category?.replace('-', ' ')} / {product.title}</nav>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border">
              {product.media?.images?.[0] && <img src={product.media.images[0]} alt={product.title} className="w-full h-full object-cover" />}
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {(product.media?.images || []).map((img, i) => (
                <img key={i} src={img} alt="" className="w-20 h-20 rounded border object-cover" />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{product.title}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating_avg) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                ))}
              </div>
              <span>({product.rating_count} reviews)</span>
            </div>

            <ul className="mt-4 space-y-2 text-sm">
              {(product.short_bullets || []).map((b, i) => (
                <li key={i} className="list-disc list-inside">{b}</li>
              ))}
            </ul>

            <div className="mt-4 p-4 rounded-lg bg-slate-50 border">
              <div className="text-3xl font-extrabold">£{product.price?.inc_vat?.toFixed ? product.price.inc_vat.toFixed(2) : product.price?.inc_vat}</div>
              <div className="text-xs text-slate-500">£{product.price?.ex_vat} ex VAT • Finance {product.price?.finance_available ? 'available' : 'not available'}</div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center border rounded-lg">
                <button className="p-2" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus className="w-4 h-4" /></button>
                <span className="px-3">{qty}</span>
                <button className="p-2" onClick={() => setQty(q => q + 1)}><Plus className="w-4 h-4" /></button>
              </div>
              <button className="flex-1 bg-black text-white rounded-lg py-3 font-semibold">Add to cart</button>
            </div>

            <div className="mt-6">
              <h3 className="font-bold mb-2">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {(product.specs || []).map((s, i) => (
                  <div key={i} className="flex text-sm">
                    <dt className="w-40 text-slate-500">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {product.accessory_items && product.accessory_items.length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold mb-2">Accessories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.accessory_items.map((a) => (
                    <div key={a.sku} className="border rounded-lg p-3">
                      <div className="aspect-[4/3] bg-slate-50 rounded mb-2 overflow-hidden">
                        {a.media?.images?.[0] && <img src={a.media.images[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="text-sm font-medium line-clamp-2">{a.title}</div>
                      <div className="text-sm font-bold mt-1">£{a.price?.inc_vat}</div>
                      <button className="mt-2 w-full text-xs bg-slate-900 text-white rounded py-1.5">Add</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="font-bold mb-2">Customer reviews</h3>
              <div className="space-y-4">
                {reviews.items.map((r, i) => (
                  <div key={i} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-4 h-4 ${j < r.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">{r.title}</span>
                    </div>
                    <p className="text-sm mt-1">{r.body}</p>
                    <p className="text-xs text-slate-500 mt-1">by {r.author}</p>
                  </div>
                ))}
                {reviews.total === 0 && <p className="text-sm text-slate-500">No reviews yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 border-t p-3 md:hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="font-extrabold text-xl">£{product.price?.inc_vat}</div>
          <button className="flex-1 bg-black text-white rounded-lg py-3 font-semibold">Add to cart</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
