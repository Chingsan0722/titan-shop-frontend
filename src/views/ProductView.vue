<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from '../stores/userInfo'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import { productAPI } from '../api/product'
import { cartAPI } from '../api/cart'
const isLoading = ref(false)
const isAvailable = ref(true)
const userStore = useUserStore()
const cartStore = useCartStore()
const productStore = useProductStore()
const { product } = storeToRefs(productStore)
const route = useRouter()
const role = userStore.role
const id = route.currentRoute._value.params.id
const getData = async () => {
  const result = await productAPI.getProduct(id)
  if (result.success) {
    productStore.setData(result.data[0])
  } else {
    console.error('Get product failed', result.error)
  }
}
getData()

const addCart = async () => {
  try {
    isLoading.value = true
    await cartAPI.addCart(id, { quantity: 1 })
    const carts = await cartAPI.getCart()
    if (carts) cartStore.carts = carts
    window.alert('新增成功')
  } catch (error) {
    window.alert('庫存不足')
  } finally {
    isLoading.value = false
  }
}

const offProduct = async () => {
  try {
    isLoading.value = true
    const formData = new FormData()
    formData.append('available', false)
    const responseA = await productAPI.updateProduct(id, formData)
    if (responseA.success) {
      window.alert('已下架商品')
      isAvailable.value = false
      const responseB = await productAPI.getAllProducts()
      if (responseB.success) {
        productStore.setProducts(responseB.data.filter((product) => product.available === 1))
      }
    } else {
      window.alert('下架失敗，請稍後再試')
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <img v-if="product && product.image" :src="product.image" alt="Product Image" class="img-fluid">
        <img v-else src="@/assets/mockProduct.svg" alt="Product Image" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h2>{{ product ? product.name : '商品不存在' }}</h2>
        <p class="lead">{{ product ? product.description : '商品敘述不存在' }}</p>
        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat orci sed neque fringilla, ac congue massa fermentum. Donec eu nunc eget tellus rutrum ullamcorper et non erat.</p>
        <h3>NTD $ {{ product ? product.price : '0' }}</h3>
        <h5>庫存: {{ product ? product.stock : '0' }}</h5>
        <h5>已售出: {{ product ? product.totalSold : '0' }}</h5>
        <div v-if="isAvailable">
          <button v-if="role === 'user'" :disabled="isLoading" class="btn btn-primary" @click="addCart">
            <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
            加到購物車</button>
          <button v-if="role === 'admin'" :disabled="isLoading" class="btn btn-warning" @click="offProduct">
            <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
            下架商品</button>
        </div>
        <div v-else>
          <button class="btn btn-outline-primary" disabled>商品已下架</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.img-fluid {
  width:80%;
}
</style>
