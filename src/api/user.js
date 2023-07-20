import { axiosInstance } from './axiosInstance'

export const getUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`)
    return data
  } catch (error) {
    console.error(error)
  }
}
