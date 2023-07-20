import { axiosInstance, baseURL } from './axiosInstance.js'
import axios from 'axios'
export const productAPI = {
  getProduct: async (id) => {
    try {
      const { data } = await axios.get(`${baseURL}/products/${id}`)
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  },
  getAllProducts: async () => {
    try {
      const { data } = await axios.get(`${baseURL}/products`)
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  },
  addProduct: async (payload) => {
    try {
      const { data } = await axiosInstance.post('/products', payload)
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  },
  updateProduct: async (id, payload) => {
    try {
      const { data } = await axiosInstance.put(`/products/${id}`, payload)
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  },
  deleteProduct: async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/products/${id}`)
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  }
}
