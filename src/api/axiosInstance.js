import axios from 'axios'
export const baseURL = 'http://localhost:80/api'
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

// // response 攔截器
// axiosInstance.interceptors.response.use(
//   (response) => {
//   // 回傳的 status code 在 2xx 區間會觸發這個函式
//   // 可以在這裡拿到 response 做處理
//     return response
//   },
//   (error) => {
//   // 回傳的 status code 不在 2xx 區間會觸發這個函式
//   // 可以在這裡拿到 response error 做處理
//     if (error.response) {
//       switch (error.response.status) {
//         // 可以在這裡針對不同 status code 做處理
//         case 401:
//           alert('Unauthorized')
//           console.error(error.message)
//           break
//         case 404:
//           alert('Page Not Found')
//           console.error(error.message)
//           break
//         case 500:
//           alert('Internal Server Error')
//           console.error(error.message)
//           break
//         default:
//           alert('App broken')
//           console.error(error.message)
//       }
//     }
//     if (!window.navigator.onLine) {
//       alert('Please reload ♥ F5')
//       return
//     }
//     return Promise.reject(error)
//   })
