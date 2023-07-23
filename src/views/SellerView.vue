<script setup>
import SellerProduct from '../components/SellerProduct.vue'
import BtnGroup from '../components/BtnGroup.vue'
import { useProductStore } from '../stores/product'
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
  <div class="container mt-5">
    <div class="text-center">
      <h1>銷售者管理頁面</h1>
    </div>
    <div class="d-flex">
      <div class="p-2"><h3>商品清單</h3></div>
      <div class="p-2"><BtnGroup/></div>
      <div class="p-2">
        <a class="btn btn-dark" href="/product/new">新增商品</a>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th  scope="col">商品編號</th>
          <th scope="col">商品名稱</th>
          <th scope="col">商品金額</th>
          <th scope="col">商品簡述</th>
          <th scope="col">庫存剩餘</th>
          <th scope="col">歷史銷量</th>
          <th scope="col">銷售額</th>
          <th scope="col">編輯</th>
          <th scope="col">下架</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productStore.products" :key="product.id">
          <SellerProduct :product="product"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>
