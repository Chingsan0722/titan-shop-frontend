// 必須的
import { defineStore } from 'pinia'
// 引入 signin api
// 先留著
import { ref } from 'vue'
export const useUserStore = defineStore('users', {
  state: () => ({
    id: ref(''),
    account: ref(''),
    password: ref(''),
    name: ref(''),
    role: 'user',
    rememberMe: ref(false),
    login: ref(false),
    token: ''
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
        this.role = userInfo.role || 'user'
      }
    }
  }
})
