<script setup>
import { watch, ref } from 'vue'
import CardProduct from '../components/CardProduct.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import Pagination from '../components/PaginationComp.vue'
import { useProductStore } from '@/stores/product'
import { productAPI } from '../api/product'
const productStore = useProductStore()
// search keyword
const searchKeyword = ref('')
const searchFilterProducts = () => {
  if (!searchKeyword.value) {
    getData()
  } else {
    return productStore.products.filter((product) => product.name.toLowerCase().includes(searchKeyword.value.toLowerCase()))
  }
}
const searchProducts = () => {
  getData()
  productStore.setProducts(searchFilterProducts())
}
// search price
const lowPrice = ref(null)
const highPrice = ref(null)
const priceFilterProducts = () => {
  return productStore.products.filter((product) => (Number(product.price) >= lowPrice.value) && (Number(product.price) <= highPrice.value))
}
const searchPriceProducts = () => {
  if (lowPrice.value === null) lowPrice.value = 0
  if (highPrice.value === null) highPrice.value = 999999
  productStore.setProducts(priceFilterProducts())
}
// getProducts
const getData = async (categoryId) => {
  let result
  if (categoryId) {
    result = await productAPI.getAllProducts(categoryId)
  } else {
    result = await productAPI.getAllProducts()
  }
  if (result) {
    productStore.setProducts(result.data)
  } else {
    console.error('Get products failed', result.error)
  }
}
getData()
// get selected category
watch(() => productStore.categorySwitch, (newValue) => {
  getData(newValue)
})
</script>
<template>
  <div class="container mt-2">
    <div>{{productStore.categorySwitch}}</div>
    <h1 class="text-center">商品列表</h1>
    <div class="d-flex justify-content-between">
      <div class="p-2 d-flex">
        <form class="d-flex" @submit.prevent="searchProducts">
          <input v-model="searchKeyword" class="form-control me-2" type="search" placeholder="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div class=" p-2">
        <div class="d-flex align-items-center input-group">
          <span class="input-group-text" id="inputGroup-sizing">價格</span>
          <input v-model="lowPrice" type="text" class="form-control form-control">
          <span class="input-group-text" id="inputGroup-sizing">～</span>
          <input v-model="highPrice" type="text" class="form-control form-control">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="searchPriceProducts">查詢</button>
        </div>
      </div>
      <div class="p-2">
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
