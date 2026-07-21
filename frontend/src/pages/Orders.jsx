import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { orderApi } from '../api'
import { formatNumber } from '../utils'

export default function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待支付' },
    { key: 'paid', label: '已支付' },
    { key: 'used', label: '已使用' }
  ]

  useEffect(() => {
    loadOrders()
  }, [activeTab])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const res = await orderApi.getList({ 
        status: activeTab === 'all' ? 'all' : activeTab 
      })
      setOrders(res.data?.list || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status) => {
    const map = {
      pending: '待支付',
      paid: '待使用',
      used: '已使用',
      cancelled: '已取消'
    }
    return map[status] || status
  }

  const getStatusColor = (status) => {
    const map = {
      pending: 'text-amber-500',
      paid: 'text-green-500',
      used: 'text-gray-500',
      cancelled: 'text-gray-400'
    }
    return map[status] || 'text-gray-500'
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white px-4 pt-3 pb-2 sticky top-0 z-30">
        <h1 className="text-lg font-bold text-gray-900 mb-3">我的订单</h1>
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 text-sm relative ${
                activeTab === tab.key ? 'text-rose-500 font-medium' : 'text-gray-500'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton h-28 rounded-xl" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          orders.map(order => (
            <div 
              key={order.id}
              className="bg-white rounded-xl overflow-hidden cursor-pointer"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">订单号: {order.orderNo}</span>
                  <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex">
                  <img 
                    src={order.activity?.coverImage} 
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                      {order.activity?.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      📍 {order.activity?.storeName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      🕐 {order.activity?.date} {order.activity?.startTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <div className="flex items-center">
                    <img 
                      src={order.manager?.avatar} 
                      alt=""
                      className="w-5 h-5 rounded-full mr-1.5"
                    />
                    <span className="text-xs text-gray-500">{order.manager?.name}</span>
                    <span className="mx-2 text-gray-200">·</span>
                    <span className="text-xs text-gray-400">{order.ticketName} x{order.quantity}</span>
                  </div>
                  <span className="text-rose-500 font-medium text-sm">
                    ¥{order.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            <span className="text-5xl">🎫</span>
            <p className="mt-3">暂无订单</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 bg-rose-500 text-white text-sm rounded-full"
            >
              去看看活动
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
