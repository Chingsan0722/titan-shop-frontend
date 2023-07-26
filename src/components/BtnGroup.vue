<script setup>
import { useProductStore } from '../stores/product'
const productStore = useProductStore()
function productSort (type) {
  productStore.sellerSort = type
}
</script>
<template>
  <!-- v-model="productStore.homeSort" -->
  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked @click="productSort('default')">
    <label class="btn btn-outline-primary" for="btnradio1" >預設排序</label>

    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" @click="productSort('totalAmount')">
    <label class="btn btn-outline-primary" for="btnradio2" >銷售額排序</label>

    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" @click="productSort('totalSold')">
    <label class="btn btn-outline-primary" for="btnradio3">銷售量排序</label>

    <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" @click="productSort('stockLeft')">
    <label class="btn btn-outline-primary" for="btnradio4">庫存剩餘排序</label>

  </div>
</template>
