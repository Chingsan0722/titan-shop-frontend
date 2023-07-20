<script setup>
// 導入 router 製作路由
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
// 導入 元件
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <RouterView />
</template>
