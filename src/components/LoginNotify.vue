<!-- 做不出來但不是必要功能 先不管 -->
<!-- 可以讓 toast 透過 toast.show() 顯示，但是無法做出更新的樣子，還有太多 vue 功能沒學 -->
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
          已登入
        </div>
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div class="toast-container">
      <div class="toast" id="logout" role="alert" aria-live="assertive" aria-atomic="true" autohide="false">
        <div class="toast-header">
          <strong class="me-auto">登入狀態</strong>
          <small class="text-muted">just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          已登出
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { useUserStore } from '@/stores/userInfo'

// 获取 login 状态
const users = useUserStore()

// 监听 login 状态的变化
onMounted(() => {
  watch(users, () => {
    if (users.login) {
      // login 状态为 true 时执行 toast.show()
      nextTick(() => {
        // 使用 this.$refs 或其他方式获取到 toast 实例
        const toastElement = document.getElementById('login')
        // eslint-disable-next-line no-undef
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
      })
    } else {
      // login 状态为 true 时执行 toast.show()
      nextTick(() => {
        // 使用 this.$refs 或其他方式获取到 toast 实例
        const toastElement = document.getElementById('logout')
        // eslint-disable-next-line no-undef
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
      })
    }
  })
})
</script>
