<script setup>
import { watch, ref } from 'vue'
import { useUserStore } from '../stores/userInfo'
import { useRouter } from 'vue-router'
const router = useRouter()
const users = useUserStore()
function logOut () {
  users.logOut()
  router.push('/')
}
const reloadNavbar = ref(false)
watch(() => users.token, (newValue, oldValue) => {
  reloadNavbar.value = true
})
</script>

<template>
  <nav class="navbar py-2 navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        TitanShop</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="/about">About</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              種類
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">上衣類</a></li>
              <li><a class="dropdown-item" href="#">下身類</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">內衣類</a></li>
              <li><a class="dropdown-item" href="#">配件類</a></li>
              <li><a class="dropdown-item" href="#">鞋類</a></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav  flex-wrap bd-navbar-nav py-md-0">
          <li class="nav-item me-3">
            <a v-if="users.role === 'user'" type="button" class="btn btn-outline-primary" href="/cart">
              購物車 <span class="badge bg-primary">9</span>
              <span class="visually-hidden">in carts</span>
            </a>
            <a v-else-if="users.role === 'admin'" type="button" class="btn btn-outline-primary" href="/seller">
              商家管理
            </a>
          </li>
          <li class="nav-item">
            <a v-if="users.role === 'admin' || users.role === 'user'" class="nav-link text-primary" href="/" aria-disabled="true" @click="logOut">Logout</a>
            <a v-else-if="users.role === 'visitor'" class="nav-link text-primary" href="/login" aria-disabled="true">Login</a>
          </li>
        </ul>
        <form class="d-flex ">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style>
.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0;
}
.nav-link img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
#in-cart {
  color:azure
}
</style>
