import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/', label: '首页', icon: '🏠', activeIcon: '🏡' },
  { path: '/discover', label: '发现', icon: '🔍', activeIcon: '✨' },
  { path: '/orders', label: '订单', icon: '🎫', activeIcon: '🎟️' },
  { path: '/profile', label: '我的', icon: '👤', activeIcon: '😊' }
]

export default function TabBar() {
  const location = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 safe-area-bottom z-50">
      <div className="flex items-center justify-around h-14">
        {tabs.map(tab => {
          const isActive = tab.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(tab.path)
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <span className="text-xl mb-0.5">{isActive ? tab.activeIcon : tab.icon}</span>
              <span className={`text-xs ${isActive ? 'text-rose-500 font-medium' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
