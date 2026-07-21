import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { activityApi } from '../api'
import NavBar from '../components/NavBar'
import { formatNumber, getLevelColor } from '../utils'

export default function ActivityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState(null)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDetail()
  }, [id])

  const loadDetail = async () => {
    setLoading(true)
    try {
      const res = await activityApi.getDetail(id)
      setActivity(res.data)
      if (res.data.tickets?.length > 0) {
        setSelectedTicket(res.data.tickets[0])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleBuy = () => {
    const ticket = selectedTicket || { id: null, name: '入场券', price: activity.price }
    navigate('/order/confirm', {
      state: {
        activityId: activity.id,
        ticketId: ticket.id,
        ticketName: ticket.name,
        price: ticket.price,
        quantity
      }
    })
  }

  if (loading || !activity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar title="活动详情" />
        <div className="p-4 space-y-4">
          <div className="skeleton h-48 rounded-xl" />
          <div className="skeleton h-6 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
        </div>
      </div>
    )
  }

  const manager = activity.manager
  const totalPrice = (selectedTicket?.price || activity.price) * quantity

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <NavBar title="活动详情" />
      
      <div className="relative">
        <img 
          src={activity.coverImage} 
          alt={activity.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="bg-white -mt-4 rounded-t-3xl relative px-4 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <h1 className="text-lg font-bold text-gray-900 flex-1 pr-4">{activity.title}</h1>
          <div className="text-right">
            {activity.price > 0 ? (
              <div>
                <span className="text-rose-500 text-xl font-bold">¥{activity.price}</span>
                {activity.originalPrice > activity.price && (
                  <span className="text-gray-400 text-xs line-through ml-1">
                    ¥{activity.originalPrice}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-green-500 font-medium">免费入场</span>
            )}
          </div>
        </div>

        <div 
          className="flex items-center mt-4 p-3 bg-gray-50 rounded-xl cursor-pointer"
          onClick={() => navigate(`/manager/${manager?.id}`)}
        >
          <img 
            src={manager?.avatar} 
            alt={manager?.name}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium text-gray-900">{manager?.name}</span>
              {manager?.level && (
                <span className={`ml-2 px-1.5 py-0.5 text-xs text-white rounded bg-gradient-to-r ${getLevelColor(manager.level)}`}>
                  {manager.level}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{formatNumber(manager?.followers || 0)} 粉丝 · {manager?.totalActivities} 场活动</p>
          </div>
          <span className="text-gray-400">›</span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-6 text-center">🕐</span>
            <span>{activity.date} {activity.startTime} - {activity.endTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-6 text-center">📍</span>
            <span className="flex-1">{activity.storeName}</span>
          </div>
          <div className="flex items-start text-sm text-gray-600">
            <span className="w-6 text-center">🗺️</span>
            <span className="flex-1 text-gray-500">{activity.storeAddress}</span>
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h3 className="font-bold text-gray-900 mb-3">🎫 票种选择</h3>
        {activity.tickets?.length > 0 ? (
          <div className="space-y-2">
            {activity.tickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTicket?.id === ticket.id
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{ticket.name}</div>
                    <p className="text-xs text-gray-500 mt-1">{ticket.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-rose-500 font-bold">
                      {ticket.price > 0 ? `¥${ticket.price}` : '免费'}
                    </div>
                  </div>
                </div>
                {ticket.perks?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {ticket.perks.map((perk, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white text-xs text-gray-600 rounded-full">
                        ✓ {perk}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{activity.minConsumption > 0 ? `最低消费 ¥${activity.minConsumption}` : '免费入场'}</span>
              <span className="text-rose-500 font-medium">{activity.minConsumption > 0 ? '到店支付' : '免预约'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">购买数量</h3>
          <div className="flex items-center">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
            >
              −
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button 
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h3 className="font-bold text-gray-900 mb-3">📋 活动详情</h3>
        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {activity.description}
        </div>
      </div>

      {activity.images?.length > 0 && (
        <div className="bg-white mt-2 px-4 py-4">
          <h3 className="font-bold text-gray-900 mb-3">📸 活动图片</h3>
          <div className="grid grid-cols-2 gap-2">
            {activity.images.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt=""
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-3 safe-area-bottom">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="text-xs text-gray-400">合计</div>
            <div className="text-rose-500 text-xl font-bold">
              ¥{totalPrice}
            </div>
          </div>
          <button 
            onClick={handleBuy}
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/30"
          >
            立即{activity.price > 0 ? '购票' : '报名'}
          </button>
        </div>
      </div>
    </div>
  )
}
