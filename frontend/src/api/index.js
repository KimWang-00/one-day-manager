import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

export const activityApi = {
  getList: (params) => request.get('/activities', { params }),
  getToday: () => request.get('/activities/today'),
  getDetail: (id) => request.get(`/activities/${id}`)
}

export const managerApi = {
  getList: (params) => request.get('/managers', { params }),
  getDetail: (id) => request.get(`/managers/${id}`),
  getActivities: (id, params) => request.get(`/managers/${id}/activities`, { params }),
  getPosts: (id, params) => request.get(`/managers/${id}/posts`, { params })
}

export const postApi = {
  getList: (params) => request.get('/posts', { params })
}

export const orderApi = {
  create: (data) => request.post('/orders', data),
  pay: (id) => request.post(`/orders/${id}/pay`),
  getList: (params) => request.get('/orders', { params }),
  getDetail: (id) => request.get(`/orders/${id}`)
}

export const categoryApi = {
  getList: () => request.get('/categories')
}

export default request
