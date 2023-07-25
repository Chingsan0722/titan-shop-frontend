<script setup>
import { watch } from 'vue'
import { useUserStore } from '../stores/userInfo'
import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
import { cartAPI } from '../api/cart'
const router = useRouter()
const cartStore = useCartStore()
const productStore = useProductStore()
const userStore = useUserStore()
function logOut () {
  userStore.logOut()
  router.push('/')
}
function loginPage () {
  router.push('/login')
}
function cartPage () {
  router.push('/cart')
}
function sellerPage () {
  router.push('/seller')
}
function switchCategory (categoryId) {
  productStore.categorySwitch = categoryId
}
const getCarts = async () => {
  const carts = await cartAPI.getCart()
  if (carts) cartStore.carts = carts
}
getCarts()
watch(() => cartStore.carts, () => {
  cartStore.inCart = cartStore.carts.length
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
              <li><a class="dropdown-item" href="#" @click="switchCategory(1)">上衣類</a></li>
              <li><a class="dropdown-item" href="#" @click="switchCategory(2)">下身類</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" @click="switchCategory(3)">內衣類</a></li>
              <li><a class="dropdown-item" href="#" @click="switchCategory(4)">配件類</a></li>
              <li><a class="dropdown-item" href="#" @click="switchCategory(5)">鞋類</a></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav  flex-wrap bd-navbar-nav py-md-0">
          <li class="nav-item me-3">
            <a v-if="userStore.role === 'user'" type="button" class="btn btn-outline-primary" href="" @click="cartPage">
              購物車 <span class="badge bg-primary">{{ cartStore.inCart }}</span>
              <span class="visually-hidden">in carts</span>
            </a>
            <a v-else-if="userStore.role === 'admin'" type="button" class="btn btn-outline-primary" href="" @click="sellerPage">
              商家管理
            </a>
          </li>
          <li class="nav-item">
            <a v-if="userStore.role === 'admin' || userStore.role === 'user'" class="nav-link text-primary" href="" aria-disabled="true" @click="logOut">Logout</a>
            <a v-else-if="userStore.role === 'visitor'" class="nav-link text-primary" aria-disabled="true" href="" @click="loginPage">Login</a>
          </li>
        </ul>
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
