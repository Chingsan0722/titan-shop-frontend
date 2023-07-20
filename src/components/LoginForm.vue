<script setup>
import { useUserStore } from '@/stores/userInfo'
import { signin } from '../api/auth.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const users = useUserStore()
const router = useRouter()
const login = async () => {
  const result = await signin({
    account: users.account,
    password: users.password
  })
  if (result.success) {
    console.log('Login successful')
    // 目前除非有勾 rememberMe 不然 local不會有東西
    localStorage.setItem('authToken', result.token)
    users.token = result.token
    users.role = result.data.role
    users.login = ref(true)
    console.log(users.login)
    router.push('/')
  } else {
    console.error('Login failed', result.error)
  }
}

</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Login</h5>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="account" class="form-label">Account</label>
                <input v-model="users.account" type="text" class="form-control" id="account" placeholder="Enter your account"  autocomplete="account" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="users.password" type="password" class="form-control" id="password" placeholder="Enter your password" autocomplete="password" required>
              </div>
              <div class="mb-3 form-check">
                <input v-model="users.rememberMe" type="checkbox" class="form-check-input" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember me</label>
              </div>
              <button type="submit" class="btn btn-primary" @click="login">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
