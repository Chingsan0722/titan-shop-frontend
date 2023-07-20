import { axiosInstance, baseURL } from './axiosInstance.js'
import axios from 'axios'
export const productAPI = {
  getProduct: async ({ id }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products/${id}`)
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  },
  getAllProducts: async () => {
    const { data } = await axios.get(`${baseURL}/products/all`)
    return data
  },
  addProduct: async (payload) => {
    const { data } = await axiosInstance.post('/products', payload)
    return data
  },
  updateProduct: async (id, payload) => {
    const { data } = await axiosInstance.put(`/products/${id}`, payload)
    return data
  },
  deleteProduct: async (id) => {
    const { data } = await axiosInstance.delete(`/products/${id}`)
    return data
  }
}
