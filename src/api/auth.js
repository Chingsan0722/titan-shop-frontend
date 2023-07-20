import axios from 'axios'
import { baseURL } from './axiosInstance.js'
export const signin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/signin`, { account, password })
    const authToken = data.token
    if (authToken) return { success: true, ...data }
  } catch (error) {
    return { success: false, error }
  }
}

// register 先不要
