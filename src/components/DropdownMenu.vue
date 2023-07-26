<script setup>
import { useProductStore } from '../stores/product'
const productStore = useProductStore()
</script>
<template>
  <select class="form-select" v-model="productStore.homeSort">
    <option value="default" selected>預設排序</option>
    <option value="hot">最熱銷在前</option>
    <option value="new">最新上架在前</option>
    <option value="high">金額 高 -> 低</option>
    <option value="low">金額 低 -> 高</option>
  </select>
</template>

<style>
</style>
