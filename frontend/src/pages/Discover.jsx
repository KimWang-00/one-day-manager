import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { managerApi, postApi } from '../api'
import { formatNumber, formatDateTime, getLevelColor } from '../utils'

export default function Discover() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('recommend')
  const [managers, setManagers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (activeTab === 'recommend') {
      loadPosts()
    } else {
      loadManagers()
    }
  }, [activeTab])

  const loadPosts = async () => {
    setLoading(true)
    try {
      const res = await postApi.getList({ pageSize: 20 })
      setPosts(res.data?.list || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadManagers = async () => {
    setLoading(true)
    try {
      const res = await managerApi.getList({ pageSize: 20 })
      setManagers(res.data?.list || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white px-4 pt-3 pb-2 sticky top-0 z-30">
        <h1 className="text-lg font-bold text-gray-900 mb-3">发现</h1>
        <div className="bg-gray-100 rounded-full px-4 py-2.5 flex items-center mb-3">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="搜索店长、活动..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex">
          <button
            onClick={() => setActiveTab('recommend')}
            className={`flex-1 py-2 text-sm relative ${
              activeTab === 'recommend' ? 'text-rose-500 font-medium' : 'text-gray-500'
            }`}
          >
            推荐
            {activeTab === 'recommend' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('managers')}
            className={`flex-1 py-2 text-sm relative ${
              activeTab === 'managers' ? 'text-rose-500 font-medium' : 'text-gray-500'
            }`}
          >
            热门店长
            {activeTab === 'managers' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'recommend' && (
          <div className="columns-2 gap-3 space-y-3">
            {posts.map(post => (
              <div 
                key={post.id}
                className="break-inside-avoid bg-white rounded-xl overflow-hidden cursor-pointer"
                onClick={() => navigate(`/manager/${post.managerId}`)}
              >
                {post.images?.length > 0 && (
                  <img 
                    src={post.images[0]} 
                    alt=""
                    className="w-full object-cover"
                    style={{ height: post.images.length > 1 ? '180px' : '220px' }}
                  />
                )}
                <div className="p-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <img 
                        src={post.manager?.avatar} 
                        alt=""
                        className="w-5 h-5 rounded-full mr-1.5"
                      />
                      <span className="text-xs text-gray-500 truncate max-w-16">
                        {post.manager?.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ❤️ {formatNumber(post.likes)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'managers' && (
          <div className="space-y-3">
            {managers.map((manager, index) => (
              <div 
                key={manager.id}
                className="bg-white rounded-xl p-3 flex items-center cursor-pointer"
                onClick={() => navigate(`/manager/${manager.id}`)}
              >
                <div className="relative">
                  {index < 3 && (
                    <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 ${
                      index === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                      'bg-gradient-to-br from-amber-600 to-amber-700'
                    }`}>
                      {index + 1}
                    </div>
                  )}
                  <img 
                    src={manager.avatar} 
                    alt={manager.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 truncate">{manager.name}</span>
                    {manager.level && (
                      <span className={`ml-2 px-1.5 py-0.5 text-xs text-white rounded bg-gradient-to-r ${getLevelColor(manager.level)} flex-shrink-0`}>
                        {manager.level}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{manager.bio}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <span>👥 {formatNumber(manager.followers)} 粉丝</span>
                    <span className="mx-2">·</span>
                    <span>🎯 {manager.totalActivities} 场活动</span>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-rose-50 text-rose-500 text-sm rounded-full font-medium">
                  关注
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
