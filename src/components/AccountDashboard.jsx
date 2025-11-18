import Header from './Header'
import Footer from './Footer'

export default function AccountDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 border rounded-xl p-4">
          <h2 className="font-bold mb-3">My Account</h2>
          <nav className="space-y-2 text-sm">
            <a className="block p-2 rounded bg-slate-100">Orders</a>
            <a className="block p-2 rounded hover:bg-slate-50">Addresses</a>
            <a className="block p-2 rounded hover:bg-slate-50">Warranties</a>
            <a className="block p-2 rounded hover:bg-slate-50">Settings</a>
          </nav>
        </aside>
        <section className="lg:col-span-3 space-y-4">
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-2">Recent orders</h3>
            <div className="text-sm text-slate-600">No orders yet.</div>
          </div>
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-2">Warranty registrations</h3>
            <div className="text-sm text-slate-600">Register your products to extend warranty.</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
