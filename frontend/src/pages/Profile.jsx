import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()

  const menuItems = [
    { icon: '🎫', label: '我的订单', path: '/orders' },
    { icon: '❤️', label: '我的关注', path: '' },
    { icon: '⭐', label: '我的收藏', path: '' },
    { icon: '🎁', label: '优惠券', path: '' },
    { icon: '📞', label: '联系客服', path: '' },
    { icon: '⚙️', label: '设置', path: '' }
  ]

  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path)
    } else {
      alert('功能开发中...')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-400 text-white px-4 pt-10 pb-12">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            😊
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-bold">小星星</h2>
            <p className="text-sm text-rose-100 mt-1">ID: 10086888</p>
          </div>
          <button className="text-rose-100">
            ⚙️
          </button>
        </div>
        
        <div className="flex mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex-1 text-center">
            <div className="text-xl font-bold">3</div>
            <div className="text-xs text-rose-100 mt-0.5">关注</div>
          </div>
          <div className="flex-1 text-center border-l border-r border-white/20">
            <div className="text-xl font-bold">2</div>
            <div className="text-xs text-rose-100 mt-0.5">订单</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-xl font-bold">12</div>
            <div className="text-xs text-rose-100 mt-0.5">收藏</div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-4 py-4 border-b border-gray-50">
            <div className="text-center">
              <div className="text-2xl">🎟️</div>
              <div className="text-xs text-gray-500 mt-1">待使用</div>
              <div className="text-sm font-medium text-gray-900 mt-0.5">2</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">📦</div>
              <div className="text-xs text-gray-500 mt-1">已使用</div>
              <div className="text-sm font-medium text-gray-900 mt-0.5">1</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">💰</div>
              <div className="text-xs text-gray-500 mt-1">退款中</div>
              <div className="text-sm font-medium text-gray-900 mt-0.5">0</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">📋</div>
              <div className="text-xs text-gray-500 mt-1">全部</div>
              <div className="text-sm font-medium text-gray-900 mt-0.5">3</div>
            </div>
          </div>
          <div 
            className="px-4 py-3 flex items-center justify-between text-sm text-gray-500 cursor-pointer"
            onClick={() => navigate('/orders')}
          >
            <span>查看全部订单</span>
            <span className="text-gray-300">›</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => (
            <div 
              key={item.label}
              className={`flex items-center px-4 py-3.5 cursor-pointer active:bg-gray-50 ${
                index < menuItems.length - 1 ? 'border-b border-gray-50' : ''
              }`}
              onClick={() => handleMenuClick(item)}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="flex-1 text-gray-700">{item.label}</span>
              <span className="text-gray-300">›</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 flex items-center">
          <div className="text-3xl mr-3">👑</div>
          <div className="flex-1">
            <div className="font-medium text-amber-800">开通VIP会员</div>
            <p className="text-xs text-amber-600 mt-0.5">享受专属折扣、优先购票等特权</p>
          </div>
          <button className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm rounded-full font-medium">
            立即开通
          </button>
        </div>
      </div>
    </div>
  )
}
