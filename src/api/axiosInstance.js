import axios from 'axios'
// export const baseURL = 'http://localhost:80/api'
export const baseURL = 'https://titan-shop-api.onrender.com/api'
export const axiosInstance = axios.create({ baseURL })

// request 攔截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // 在 headers 放入 jwt token 讓後端驗證身分
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
