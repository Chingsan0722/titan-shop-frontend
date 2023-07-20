// 必須的
import { defineStore } from 'pinia'
// 引入 signin api
// 先留著
// import { ref } from 'vue'
export const useProductStore = defineStore('products', {
  state: () => ({
    data: null,
    products: []
  }),
  actions: {
    setData (data) {
      this.data = data
    },
    setProducts (products) {
      this.products = products
    }
  }
})
