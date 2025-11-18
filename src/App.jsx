import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import ProductPage from './components/ProductPage'
import CategoryPage from './components/CategoryPage'
import AccountDashboard from './components/AccountDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:sku" element={<ProductPage />} />
      <Route path="/categories/:slug" element={<CategoryPage />} />
      <Route path="/account" element={<AccountDashboard />} />
    </Routes>
  )
}

export default App
