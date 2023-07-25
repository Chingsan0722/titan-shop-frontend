<script setup>
import { useUserStore } from '../stores/userInfo'
import { cartAPI } from '../api/cart'
const users = useUserStore()
const role = users.role
// eslint-disable-next-line vue/no-setup-props-destructure
const { product } = defineProps(['product'])
const addCart = async () => {
  try {
    await cartAPI.addCart(product.id, { quantity: 1 })
    window.alert('新增成功')
  } catch (error) {
    window.alert('庫存不足')
  }
}
</script>

<template>
  <div class="card align-center">
    <router-link :to="`/product/${product.id}`">
      <img :src="product.image" alt="Product Image" class="card-img-top">
    </router-link>
    <div class="card-body">
      <h5 class="card-title text-center">{{ product.name }}</h5>
      <p class="text-center" style="color: black; text-decoration: none"><span class="amount-highlight">＄{{ product.price }}</span></p>
      <div class="text-center">
        <div class="row justify-content-center mb-2">
        </div>
        <button v-if="role === 'user'" class="btn btn-primary" @click="addCart">加到購物車</button>
        <button v-else-if="role === 'admin'" class="btn btn-warning" @click="addCart">下架商品</button>
      </div>
    </div>
  </div>
</template>

<style>
.amount-highlight {
  font-size: 18px; /* 調整字體大小為 24 像素 */
  font-weight: bold; /* 調整字體加粗 */
  color: rgba(0, 153, 255, 0.575); /* 調整文字顏色為紅色 */
}
</style>
