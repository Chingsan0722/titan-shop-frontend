import { axiosInstance } from './axiosInstance'

export const orderAPI = {
  addToOrder: async () => {
    const { data } = await axiosInstance.post('/orders')
    return data
  },
  getOrder: async (id) => {
    const { data } = await axiosInstance.get(`/orders/${id}`)
    return data
  },
  deleteOrder: async (id) => {
    const { data } = await axiosInstance.delete(`/orders/users/${id}`)
    return data
  }
}
