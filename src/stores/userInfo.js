// 必須的
import { defineStore } from 'pinia'
// 引入 signin api
// 先留著
import { ref } from 'vue'
import { cartAPI } from '../api/cart'
export const useUserStore = defineStore('users', {
  state: () => ({
    id: ref(''),
    account: ref(''),
    password: ref(''),
    name: ref(''),
    role: ref('visitor'),
    rememberMe: ref(false),
    login: ref(false),
    token: ref(''),
    cartItemsLength: ref([])
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    initUserData () {
      const token = localStorage.getItem('authToken')
      const userInfoJson = localStorage.getItem('userInfo')
      const userInfo = userInfoJson ? JSON.parse(userInfoJson) : {}
      if (token) this.token = token
      if (userInfo) {
        this.id = userInfo.id
        this.account = userInfo.account
        this.name = userInfo.name
        this.role = userInfo.role || 'visitor'
      }
    },
    logOut () {
      this.id = ''
      this.account = ''
      this.name = ''
      this.role = ref('visitor')
      this.login = false
      this.token = ''
      localStorage.removeItem('authToken')
      localStorage.removeItem('userInfo')
    },
    async getCartItems () {
      const response = await cartAPI.getCart(this.id)
      if (response) this.cartItemsLength = response.length
    }
  }
})
