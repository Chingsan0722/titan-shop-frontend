<!-- 可以顯示登入但無法顯示登出 應該跟 reload 有關 -->
<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { useUserStore } from '@/stores/userInfo'

const users = useUserStore()
console.log(users.name)
onMounted(() => {
  watch(users, async () => {
    if (users.role === 'user' || users.role === 'admin') {
      console.log(users.role)
      await nextTick(() => {
        const toastElement = document.getElementById('login')
        // eslint-disable-next-line no-undef
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
      })
    }
  }
  )
})
</script>
<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div class="toast-container">
      <div class="toast" id="login" role="alert" aria-live="assertive" aria-atomic="true" autohide="false">
        <div class="toast-header">
          <strong class="me-auto">登入狀態</strong>
          <small class="text-muted">just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          已登入：主人，歡迎回來
        </div>
      </div>
    </div>
  </div>
</template>
