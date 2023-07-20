<script setup>
import { useProductStore } from '@/stores/product'
import { productAPI } from '../api/product'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const product = useProductStore()
const router = useRouter()
const id = 1
const getProduct = async () => {
  const result = await productAPI.getProduct(id)
  if (result) {
    console.log(result)
  } else {
    console.error('Get product failed', result.error)
  }
}
getProduct()
</script>
<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <img src="@/assets/mockProduct.svg" alt="Product Image" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h2>磚頭</h2>
        <p class="lead">這是 Apple 最新推出的磚頭 可以拿來敲人</p>
        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat orci sed neque fringilla, ac congue massa fermentum. Donec eu nunc eget tellus rutrum ullamcorper et non erat.</p>
        <h3>NTD $ 99</h3>
        <h5>庫存: 10</h5>
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
