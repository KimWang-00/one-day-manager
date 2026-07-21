import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { orderApi } from '../api'
import NavBar from '../components/NavBar'

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDetail()
  }, [id])

  const loadDetail = async () => {
    setLoading(true)
    try {
      const res = await orderApi.getDetail(id)
      setOrder(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status) => {
    const map = {
      pending: '待支付',
      paid: '已支付',
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

  if (loading || !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar title="订单详情" />
        <div className="p-4 space-y-4">
          <div className="skeleton h-32 rounded-xl" />
          <div className="skeleton h-20 rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="订单详情" />
      
      <div className="p-4 space-y-3">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm opacity-90">订单状态</span>
            <span className={`text-sm font-medium`}>
              {order.status === 'paid' ? '✅ 支付成功' : getStatusText(order.status)}
            </span>
          </div>
          <div className="text-3xl font-bold">{order.ticketName}</div>
          <div className="text-sm opacity-80 mt-1">x {order.quantity} 张</div>
        </div>

        <div 
          className="bg-white rounded-xl p-4 cursor-pointer"
          onClick={() => navigate(`/activity/${order.activityId}`)}
        >
          <div className="flex">
            <img 
              src={order.activity?.coverImage} 
              alt=""
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="ml-3 flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">
                {order.activity?.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                📍 {order.activity?.storeName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                🕐 {order.activity?.date} {order.activity?.startTime}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-3">📋 订单信息</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">订单编号</span>
              <span className="text-gray-900">{order.orderNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">联系人</span>
              <span className="text-gray-900">{order.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">联系电话</span>
              <span className="text-gray-900">{order.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">下单时间</span>
              <span className="text-gray-900">{order.createdAt}</span>
            </div>
            {order.paidAt && (
              <div className="flex justify-between">
                <span className="text-gray-500">支付时间</span>
                <span className="text-gray-900">{order.paidAt}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">实付金额</span>
            <span className="text-rose-500 text-xl font-bold">¥{order.totalPrice}</span>
          </div>
        </div>

        {order.status === 'paid' && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">🎫</span>
              <div className="flex-1">
                <div className="font-medium text-amber-800">验票入场</div>
                <p className="text-sm text-amber-600 mt-1">
                  请在活动当天凭手机号或订单号到场验票入场
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
