<script setup>
// 導入 router 製作路由
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
// 導入 元件
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <!-- <div class="wrapper"> -->
      <!-- <HelloWorld msg="You did it!" /> -->
<NavBar/>
    <!-- </div> -->
  </header>
<!-- 導入 router -->
  <RouterView />
</template>
