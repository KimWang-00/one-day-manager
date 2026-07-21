import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { managerApi } from '../api'
import NavBar from '../components/NavBar'
import { formatNumber, formatDateTime, getLevelColor } from '../utils'

export default function ManagerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [manager, setManager] = useState(null)
  const [activities, setActivities] = useState([])
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [loading, setLoading] = useState(true)
  const [isFollowed, setIsFollowed] = useState(false)

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    setLoading(true)
    try {
      const [infoRes, actRes, postRes] = await Promise.all([
        managerApi.getDetail(id),
        managerApi.getActivities(id, { pageSize: 10 }),
        managerApi.getPosts(id, { pageSize: 10 })
      ])
      setManager(infoRes.data)
      setActivities(actRes.data?.list || [])
      setPosts(postRes.data?.list || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !manager) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar title="店长主页" />
        <div className="p-4 space-y-4">
          <div className="skeleton h-32 rounded-xl" />
          <div className="skeleton h-6 w-1/3 rounded mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="店长主页" />
      
      <div className="relative">
        <img 
          src={manager.coverImage} 
          alt=""
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
      </div>

      <div className="relative px-4 -mt-12">
        <div className="flex items-end">
          <div className="relative">
            <img 
              src={manager.avatar} 
              alt={manager.name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {manager.level && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className={`px-2 py-0.5 text-xs text-white rounded-full bg-gradient-to-r ${getLevelColor(manager.level)}`}>
                  {manager.level}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 ml-4 pb-2">
            <h1 className="text-xl font-bold text-gray-900">{manager.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{manager.bio}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div className="text-center mr-6">
              <div className="font-bold text-gray-900">{formatNumber(manager.followers)}</div>
              <div className="text-xs text-gray-400">粉丝</div>
            </div>
            <div className="text-center mr-6">
              <div className="font-bold text-gray-900">{manager.totalActivities}</div>
              <div className="text-xs text-gray-400">活动</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">⭐ {manager.rating}</div>
              <div className="text-xs text-gray-400">评分</div>
            </div>
          </div>
          <button 
            onClick={() => setIsFollowed(!isFollowed)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              isFollowed
                ? 'bg-gray-100 text-gray-600'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/30'
            }`}
          >
            {isFollowed ? '已关注' : '+ 关注'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {manager.tags?.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-rose-50 text-rose-500 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-white">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 text-sm font-medium relative ${
              activeTab === 'posts' ? 'text-rose-500' : 'text-gray-500'
            }`}
          >
            店长动态
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex-1 py-3 text-sm font-medium relative ${
              activeTab === 'activities' ? 'text-rose-500' : 'text-gray-500'
            }`}
          >
            往期活动
            {activeTab === 'activities' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl">📝</span>
                  <p className="mt-2">暂无动态</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map(activity => (
                  <div 
                    key={activity.id}
                    className="flex p-3 bg-gray-50 rounded-xl cursor-pointer"
                    onClick={() => navigate(`/activity/${activity.id}`)}
                  >
                    <img 
                      src={activity.coverImage} 
                      alt={activity.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="ml-3 flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{activity.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">📍 {activity.storeName?.slice(0, 10)}...</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">{activity.date}</span>
                        {activity.price > 0 ? (
                          <span className="text-rose-500 text-sm font-medium">¥{activity.price}</span>
                        ) : (
                          <span className="text-green-500 text-sm font-medium">免费</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl">📅</span>
                  <p className="mt-2">暂无活动</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
      {post.images?.length > 0 && (
        <div className="grid gap-2 mt-3">
          {post.images.length === 1 ? (
            <img 
              src={post.images[0]} 
              alt=""
              className="w-full max-h-64 object-cover rounded-lg"
            />
          ) : post.images.length === 2 ? (
            <div className="grid grid-cols-2 gap-2">
              {post.images.map((img, i) => (
                <img key={i} src={img} alt="" className="w-full h-32 object-cover rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {post.images.slice(0, 3).map((img, i) => (
                <img key={i} src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
        <span>{formatDateTime(post.createdAt, 'MM-DD HH:mm')}</span>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 ${liked ? 'text-rose-500' : ''}`}
          >
            <span>{liked ? '❤️' : '🤍'}</span>
            <span>{formatNumber(likes)}</span>
          </button>
          <div className="flex items-center gap-1">
            <span>💬</span>
            <span>{formatNumber(post.comments)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔗</span>
            <span>{formatNumber(post.shares)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
