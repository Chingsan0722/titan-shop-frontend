<script setup>
import { productAPI } from '../api/product'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const name = ref('')
const categoryId = ref('')
const description = ref('')
const price = ref()
const stock = ref()
const image = ref(null)
const imagePreview = ref()
const isLoading = ref(false)
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    image.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}
const postData = async () => {
  try {
    isLoading.value = true
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('description', description.value)
    formData.append('categoryId', categoryId.value)
    formData.append('price', price.value)
    formData.append('stock', stock.value)
    formData.append('image', image.value)
    const response = await productAPI.addProduct(formData)
    if (response.success) {
      window.alert('商品已新增')
      router.push('/seller')
    } else {
      window.alert('新增失敗，請稍後再試', response.error)
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div class="container mt-4 px-5">
    <h1 class="text-center mb-4">新增商品</h1>
    <form @submit.prevent="postData">
      <div class="mb-3">
        <label for="name" class="form-label">商品名稱</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter product name">
      </div>
      <div class="input-group mb-3">
        <label for="categoryId" class="input-group-text">選擇種類</label>
        <select v-model="categoryId" class="form-select" id="form-select">
          <option :value="null" selected>請選擇</option>
          <option value="1">上衣類</option>
          <option value="2">下身類</option>
          <option value="3">內衣類</option>
          <option value="4">配件類</option>
          <option value="5">鞋類</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">商品敘述</label>
        <textarea v-model="description" class="form-control" id="description" rows="4" placeholder="Enter product description"></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">商品價格</label>
        <input v-model="price" type="number" class="form-control" id="price" placeholder="Enter product price">
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">商品庫存</label>
        <input v-model="stock" type="number" class="form-control" id="stock" placeholder="Enter product quantity">
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">商品圖片</label>
        <input type="file" class="form-control" id="image" @change="handleImageChange">
        <img class="pt-3" v-if="image" :src="imagePreview" alt="Selected Image" style="max-width: 200px;">
      </div>
      <div class="mb-3">
        <button :disabled="isLoading" type="submit" class="btn btn-primary me-2">
          <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
          確認新增</button>
        <button type="reset" class="btn btn-danger">清空</button>
      </div>
    </form>
  </div>
</template>
