import { Link } from 'react-router-dom'

export default function ProductGrid({ title, products = [], cta = 'View all', to = '#' }) {
  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          <Link to={to} className="text-sm font-medium text-slate-700 hover:text-slate-900">{cta} →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((p) => (
            <Link key={p.sku} to={`/product/${p.sku}`} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-slate-50">
                {p.media?.images?.[0] ? (
                  <img src={p.media.images[0]} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs text-slate-500 mb-1">{p.brand?.toUpperCase()} • {p.category?.replace('-', ' ')}</p>
                <h3 className="text-sm sm:text-base font-semibold leading-tight line-clamp-2 group-hover:underline">{p.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-bold text-base">£{p.price?.inc_vat?.toFixed ? p.price.inc_vat.toFixed(2) : p.price?.inc_vat}</div>
                  <button className="text-white bg-black hover:bg-slate-900 text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded">Add</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
