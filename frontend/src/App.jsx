import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ActivityDetail from './pages/ActivityDetail.jsx'
import ManagerDetail from './pages/ManagerDetail.jsx'
import OrderConfirm from './pages/OrderConfirm.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import Orders from './pages/Orders.jsx'
import Discover from './pages/Discover.jsx'
import Profile from './pages/Profile.jsx'
import TabBar from './components/TabBar.jsx'

function App() {
  const location = useLocation()
  const path = location.pathname
  const hideTabBar = ['/activity/', '/manager/', '/order/confirm', '/order/'].some(
    p => path.includes(p)
  ) && !path.includes('/orders')

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="/manager/:id" element={<ManagerDetail />} />
        <Route path="/order/confirm" element={<OrderConfirm />} />
        <Route path="/order/:id" element={<OrderDetail />} />
      </Routes>
      {!hideTabBar && <TabBar />}
    </div>
  )
}

export default App
