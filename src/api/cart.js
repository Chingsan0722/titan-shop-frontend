import { axiosInstance } from './axiosInstance'

export const cartAPI = {
  getCart: async () => {
    const { data } = await axiosInstance.get('/carts')
    return data
  },
  addCart: async (id, payload) => {
    const { data } = await axiosInstance.post(`/carts/products/${id}`, payload)
    return data
  },
  updateCart: async (id, payload) => {
    const { data } = await axiosInstance.put(`/carts/products/${id}`, payload)
    return data
  },
  deleteCart: async (id) => {
    const { data } = await axiosInstance.delete(`/carts/products/${id}`)
    return data
  },
  deleteAllCart: async () => {
    const { data } = await axiosInstance.delete('/carts/all')
    return data
  }
}
