import dayjs from 'dayjs'

export function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

export function formatDate(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export function formatDateTime(date, format = 'YYYY-MM-DD HH:mm') {
  return dayjs(date).format(format)
}

export function isToday(date) {
  return dayjs(date).isSame(dayjs(), 'day')
}

export function getStatusText(status) {
  const map = {
    ongoing: '进行中',
    upcoming: '即将开始',
    ended: '已结束'
  }
  return map[status] || status
}

export function getStatusColor(status) {
  const map = {
    ongoing: 'bg-rose-500',
    upcoming: 'bg-amber-500',
    ended: 'bg-gray-400'
  }
  return map[status] || 'bg-gray-400'
}

export function getLevelColor(level) {
  const map = {
    '顶流店长': 'from-purple-500 to-pink-500',
    '金牌店长': 'from-amber-400 to-orange-500',
    '人气店长': 'from-rose-400 to-red-500'
  }
  return map[level] || 'from-gray-400 to-gray-500'
}
