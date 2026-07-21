import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { orderApi } from '../api'
import NavBar from '../components/NavBar'

export default function OrderConfirm() {
  const location = useLocation()
  const navigate = useNavigate()
  const orderData = location.state || {}
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const totalPrice = orderData.price * orderData.quantity

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert('请填写姓名和手机号')
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号')
      return
    }

    setSubmitting(true)
    try {
      const res = await orderApi.create({
        activityId: orderData.activityId,
        ticketId: orderData.ticketId,
        quantity: orderData.quantity,
        name,
        phone
      })
      
      const payRes = await orderApi.pay(res.data.id)
      
      if (payRes.code === 0) {
        alert('购票成功！')
        navigate(`/order/${res.data.id}`, { replace: true })
      }
    } catch (e) {
      alert('提交失败，请重试')
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <NavBar title="确认订单" />
      
      <div className="p-4 space-y-3">
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-3">🎫 票种信息</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{orderData.ticketName || '入场券'}</div>
              <div className="text-sm text-gray-500 mt-1">x {orderData.quantity} 张</div>
            </div>
            <div className="text-rose-500 font-bold">
              {orderData.price > 0 ? `¥${orderData.price}` : '免费'}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-3">📞 联系信息</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">姓名</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="请输入姓名"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">手机号</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="请输入手机号"
                maxLength={11}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-3">📋 温馨提示</h3>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• 请在活动开始前15分钟到场，凭手机号验票入场</li>
            <li>• 活动票一经售出，概不退换</li>
            <li>• 如遇特殊情况活动取消，将全额退款</li>
            <li>• 最终解释权归平台及商家所有</li>
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-3 safe-area-bottom">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="text-xs text-gray-400">实付金额</div>
            <div className="text-rose-500 text-xl font-bold">
              ¥{totalPrice}
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/30 disabled:opacity-50"
          >
            {submitting ? '处理中...' : '确认支付'}
          </button>
        </div>
      </div>
    </div>
  )
}
