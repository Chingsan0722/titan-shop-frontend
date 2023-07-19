import axios from 'axios'
const baseURL = 'https://7958-2001-b400-e239-9c76-9166-d18-e811-231e.ngrok-free.app/api'
export const signin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/signin`, { account, password })
    const authToken = data.token
    if (authToken) return { success: true, ...data }
  } catch (error) {
    return { success: false, error }
  }
}

// register 先不要 :)
