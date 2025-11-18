import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, User, Wrench, Package } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Header({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    async function run() {
      if (!query) { setSuggestions([]); return }
      try {
        const res = await fetch(`${API}/api/search?q=${encodeURIComponent(query)}&limit=6`, { signal: controller.signal })
        if (res.ok) {
          const data = await res.json()
          setSuggestions(data)
        }
      } catch (e) {
        // ignore
      }
    }
    const t = setTimeout(run, 150)
    return () => { controller.abort(); clearTimeout(t) }
  }, [query])

  const onSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query)}`)
    setSuggestions([])
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(v => !v)} aria-label="Open Menu">
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
            <span className="inline-block w-3 h-6 bg-[#1e40af]"></span>
            <span>ThePowerSite</span>
          </Link>

          <form onSubmit={onSubmit} className="relative hidden md:flex flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search generators, pressure washers, tools..."
              className="w-full rounded-full border border-slate-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            {suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                {suggestions.map((s) => (
                  <Link
                    key={s.sku}
                    to={`/product/${s.sku}`}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50"
                    onClick={() => setSuggestions([])}
                  >
                    {s.image ? (
                      <img src={s.image} alt="" className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-slate-100" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.title}</p>
                      <p className="text-xs text-slate-500">{s.brand.toUpperCase()} • £{s.price_inc_vat.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
                <button className="w-full text-left text-sm px-3 py-2 border-t" onClick={onSubmit}>View all results</button>
              </div>
            )}
          </form>

          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link to="/brand/hyundai" className="hover:text-[#1e40af]">Hyundai</Link>
            <Link to="/brand/jcb" className="hover:text-[#ffb200]">JCB</Link>
            <Link to="/spares" className="flex items-center gap-1 hover:text-slate-900"><Wrench className="w-4 h-4"/> Spares</Link>
            <Link to="/deals" className="text-red-600 font-semibold">Deals</Link>
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <Link to="/account" className="p-2 rounded hover:bg-slate-100" aria-label="Account">
              <User className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="relative p-2 rounded hover:bg-slate-100" aria-label="Cart">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-black text-white rounded-full px-1.5 py-0.5">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={onSubmit} className="relative md:hidden pb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools and parts"
            className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
        </form>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-2 pt-3">
              <Link to="/brand/hyundai" className="p-3 rounded bg-[#e5edff] text-[#1e40af] font-medium">Hyundai</Link>
              <Link to="/brand/jcb" className="p-3 rounded bg-[#fff5cc] text-[#cc9900] font-medium">JCB</Link>
              <Link to="/categories/generators" className="p-3 rounded bg-slate-50">Generators</Link>
              <Link to="/categories/pressure-washers" className="p-3 rounded bg-slate-50">Pressure Washers</Link>
              <Link to="/spares" className="p-3 rounded bg-slate-50">Spares</Link>
              <Link to="/deals" className="p-3 rounded bg-red-50 text-red-700">Deals</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
