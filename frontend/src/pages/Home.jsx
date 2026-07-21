import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { activityApi, categoryApi } from '../api'
import { formatNumber, getStatusColor, getLevelColor } from '../utils'

export default function Home() {
  const navigate = useNavigate()
  const [todayActivities, setTodayActivities] = useState([])
  const [activities, setActivities] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [activeCategory])

  const loadData = async () => {
    setLoading(true)
    try {
      const [todayRes, listRes, catRes] = await Promise.all([
        activityApi.getToday(),
        activityApi.getList({ category: activeCategory, pageSize: 20 }),
        categoryApi.getList()
      ])
      setTodayActivities(todayRes.data || [])
      setActivities(listRes.data?.list || [])
      setCategories(catRes.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pb-16">
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-400 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">一日店长</h1>
            <p className="text-sm text-rose-100 mt-1">遇见你的心动店长 ✨</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg">🔔</span>
          </div>
        </div>
        
        <div 
          className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center"
          onClick={() => navigate('/discover')}
        >
          <span className="text-white/80 mr-2">🔍</span>
          <span className="text-white/70 text-sm">搜索你喜欢的店长...</span>
        </div>
      </div>

      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-lg mr-2">🌟</span>
              <h2 className="font-bold text-gray-900">今日店长</h2>
              <span className="ml-2 px-2 py-0.5 bg-rose-100 text-rose-500 text-xs rounded-full">
                进行中
              </span>
            </div>
            <span className="text-sm text-gray-400">{todayActivities.length}场活动</span>
          </div>
          
          {todayActivities.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {todayActivities.map(activity => (
                <TodayCard 
                  key={activity.id} 
                  activity={activity} 
                  onClick={() => navigate(`/activity/${activity.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <span className="text-3xl">📅</span>
              <p className="mt-2 text-sm">今日暂无活动</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 px-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === cat.id
                  ? 'bg-rose-500 text-white font-medium'
                  : 'bg-white text-gray-600 border border-gray-100'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">
            <span className="mr-2">🔥</span>热门活动
          </h2>
          <span className="text-sm text-gray-400">更多 ›</span>
        </div>
        
        <div className="space-y-3">
          {activities.map(activity => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              onClick={() => navigate(`/activity/${activity.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TodayCard({ activity, onClick }) {
  const manager = activity.manager
  return (
    <div 
      className="flex-shrink-0 w-32 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-32 h-40 rounded-xl overflow-hidden">
        <img 
          src={activity.coverImage} 
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusColor(activity.status)}`}>
            {activity.status === 'ongoing' ? '进行中' : '即将开始'}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center mb-1">
            <img 
              src={manager?.avatar} 
              alt={manager?.name}
              className="w-5 h-5 rounded-full border border-white mr-1"
            />
            <span className="text-white text-xs font-medium truncate">{manager?.name}</span>
          </div>
          <p className="text-white/90 text-xs line-clamp-2">{activity.title}</p>
        </div>
      </div>
    </div>
  )
}

function ActivityCard({ activity, onClick }) {
  const manager = activity.manager
  const progress = (activity.soldTickets / activity.totalTickets) * 100

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden card-shadow card-shadow-hover transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={activity.coverImage} 
          alt={activity.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(activity.status)}`}>
            {activity.status === 'ongoing' ? '🔥 进行中' : '⏰ 即将开始'}
          </span>
          {activity.price > 0 && (
            <span className="px-2 py-1 rounded-full text-xs bg-white/90 text-rose-500 font-medium">
              ¥{activity.price}
            </span>
          )}
          {activity.price === 0 && (
            <span className="px-2 py-1 rounded-full text-xs bg-white/90 text-green-500 font-medium">
              免费入场
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          🔥 {formatNumber(activity.hot)}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">{activity.title}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center flex-1">
            <img 
              src={manager?.avatar} 
              alt={manager?.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700 font-medium">{manager?.name}</span>
                {manager?.level && (
                  <span className={`ml-1.5 px-1.5 py-0.5 text-xs text-white rounded bg-gradient-to-r ${getLevelColor(manager.level)}`}>
                    {manager.level}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-400 mb-2">
          <span className="mr-3">📍 {activity.storeName?.slice(0, 8)}...</span>
          <span>🕐 {activity.date} {activity.startTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 mr-3">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>已售 {activity.soldTickets}</span>
              <span>剩余 {activity.totalTickets - activity.soldTickets}</span>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-rose-500 text-white text-sm rounded-full font-medium">
            {activity.price > 0 ? '购票' : '报名'}
          </button>
        </div>
      </div>
    </div>
  )
}
