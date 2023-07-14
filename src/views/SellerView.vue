<script setup>
import SellerProduct from '../components/SellerProduct.vue'
import BtnGroup from '../components/BtnGroup.vue'
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
        <button class="btn btn-dark">新增商品</button>
      </div>
    </div>
    <SellerProduct/>
  </div>
</template>
