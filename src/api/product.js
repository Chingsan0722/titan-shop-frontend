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
  getAllProducts: async (categoryId) => {
    try {
      if (categoryId) {
        const { data } = await axios.get(`${baseURL}/products?categoryId=${categoryId}`)
        return { success: true, data }
      }
      const { data } = await axios.get(`${baseURL}/products`)
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  },
  addProduct: async (payload) => {
    try {
      const { data } = await axios.post(`${baseURL}/products`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  },
  updateProduct: async (id, payload) => {
    try {
      const { data } = await axios.put(`${baseURL}/products/${id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
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
