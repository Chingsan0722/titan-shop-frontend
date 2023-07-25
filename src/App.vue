<script setup>
// 導入 router 製作路由
import { RouterView } from 'vue-router'
// import { ref, watch } from 'vue'
import LoginNotify from './components/LoginNotify.vue'
import NavBar from './components/NavBar.vue'
// import { useUserStore } from './stores/userInfo'
// const users = useUserStore()
</script>

<template>
  <header>
    <LoginNotify/>
    <NavBar/>
  </header>
  <RouterView />
</template>
