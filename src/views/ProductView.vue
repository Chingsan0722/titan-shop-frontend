<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import { productAPI } from '../api/product'
const productStore = useProductStore()
const { product } = storeToRefs(productStore)
const route = useRouter()
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
        <button class="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<style>
.img-fluid {
  width:80%;
}
</style>
