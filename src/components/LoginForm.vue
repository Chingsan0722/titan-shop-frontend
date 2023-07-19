<script setup>
import { signin } from '../api/auth.js'
import { ref } from 'vue'
const account = ref('')
const password = ref('')
const rememberMe = ref(false)
const login = async (data) => {
  const result = await signin({
    account: account.value,
    password: password.value
  })
  if (result.success) {
    console.log('Login successful')
    // 目前除非有勾 rememberMe 不然 local不會有東西
    if (rememberMe.value) {
      localStorage.setItem('authToken', result.token)
    }
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
                <input v-model="account" type="text" class="form-control" id="account" placeholder="Enter your account">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter your password">
              </div>
              <div class="mb-3 form-check">
                <input v-model="rememberMe" type="checkbox" class="form-check-input" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember me</label>
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
