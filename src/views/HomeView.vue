<script setup>
import CardProduct from '../components/CardProduct.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import PriceRange from '../components/PriceRange.vue'
import Pagination from '../components/PaginationComp.vue'
import { useProductStore } from '@/stores/product'
import { productAPI } from '../api/product'
const productStore = useProductStore()
const getData = async () => {
  const result = await productAPI.getAllProducts()
  if (result) {
    productStore.setProducts(result.data)
  } else {
    console.error('Get products failed', result.error)
  }
}
getData()
</script>
<template>
  <div class="container mt-2">
    <h1 class="text-center">商品列表</h1>
    <h3 class="text-center">《全品項》</h3>
    <div class="d-flex justify-content-md-end">
      <div class="text-end col-4 p-2">
        <PriceRange/>
      </div>
      <div class="text-end p-2">
        <DropdownMenu/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-for="product in productStore.products" :key="product.id" class="col col-md-3 mb-3">
        <CardProduct :product="product" />
      </div>
    </div>
    <Pagination/>
  </div>
</template>
