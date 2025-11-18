import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/categories/generators" className="hover:underline">Generators</Link></li>
            <li><Link to="/categories/pressure-washers" className="hover:underline">Pressure Washers</Link></li>
            <li><Link to="/categories/chainsaws" className="hover:underline">Chainsaws</Link></li>
            <li><Link to="/deals" className="hover:underline">Deals</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/support/warranty" className="hover:underline">Warranty</Link></li>
            <li><Link to="/support/returns" className="hover:underline">Returns</Link></li>
            <li><Link to="/support/manuals" className="hover:underline">Manuals</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Brands</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/brand/hyundai" className="hover:underline">Hyundai</Link></li>
            <li><Link to="/brand/jcb" className="hover:underline">JCB</Link></li>
            <li><Link to="/brand/others" className="hover:underline">Other Brands</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <p className="text-sm text-white/70">Genpower Ltd. Trading as ThePowerSite</p>
          <p className="text-xs text-white/50 mt-3">© {new Date().getFullYear()} ThePowerSite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
