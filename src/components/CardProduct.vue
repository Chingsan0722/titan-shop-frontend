<script setup>
import { ref } from 'vue'
const count = ref(1)
const addCart = () => {
  count.value++
}
const role = 'admin'
const product = {
  name: '磚頭',
  price: 300,
  stock: 10,
  discription: '123'
}
</script>

<template>
  <div class="card align-center">
    <img src="@/assets/mockProduct.svg" class="card-img-top" alt="woman">
    <div class="card-body">
      <h5 class="card-title text-center">{{ product.name }}</h5>
      <div class="row">
        <div class="col-sm-6">
          <p class="text-end"><span class="amount-highlight">＄{{ product.price }}</span></p>
        </div>
        <div class="col-sm-6">
          <p class="text-start">庫存 {{ product.stock }}</p>
        </div>
      </div>
      <div class="text-center">
        <div class="row justify-content-center mb-2">
          <div class="col-md-6">
            <input type="number" class="form-control text-center" value="1" min="1" id="quantity-input">
          </div>
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
