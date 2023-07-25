// 必須的
import { defineStore } from 'pinia'
// 引入 signin api
// 先留著
import { ref } from 'vue'
export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: ref([]),
    orderId: ref()
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setOrders (orders) {
      this.orders = orders
    },
    setOrderId (orderId) {
      this.orderId = orderId
    }
  }
})
