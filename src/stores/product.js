// 必須的
import { defineStore } from 'pinia'
// 引入 signin api
// 先留著
import { ref } from 'vue'
export const useProductStore = defineStore('products', {
  state: () => ({
    product: ref(null),
    products: ref([]),
    categorySwitch: ref(null),
    sort: ref(null)
  }),
  actions: {
    setData (product) {
      this.product = product
    },
    setProducts (products) {
      this.products = products
    }
  }
})
