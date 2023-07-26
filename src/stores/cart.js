// 必須的
import { defineStore } from 'pinia'
// 引入 signin api
// 先留著
import { ref } from 'vue'
export const useCartStore = defineStore('carts', {
  state: () => ({
    carts: ref([]),
    inCart: ref(0),
    totalAmount: ref(0),
    isSubtotalLoading: ref(false)
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setCarts (carts) {
      this.carts = carts
      this.getTotalAmount()
    },
    getTotalAmount () {
      this.totalAmount = this.carts.reduce((total, cart) => total + (cart.quantity * cart.price), 0)
    }
  }
})
