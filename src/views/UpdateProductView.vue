<script setup>
import { productAPI } from '../api/product'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
const router = useRouter()
// import axios from 'axios'
const name = ref('')
const categoryId = ref('')
const categoryName = ref('')
const description = ref('')
const price = ref()
const stock = ref()
const image = ref(null)
const imagePreview = ref()
const isUpdateLoading = ref(false)
const isRemoveLoading = ref(false)
const id = route.currentRoute._value.params.id
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    image.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}
const getProduct = async () => {
  try {
    const response = await productAPI.getProduct(id)
    if (response.success) {
      const product = response.data[0]
      name.value = product.name
      categoryId.value = product.categoryId
      categoryName.value = product.categoryName
      description.value = product.description
      price.value = product.price
      stock.value = product.stock
    } else {
      window.alert('無法取得商品，請稍後再試', response.error)
    }
  } catch (error) {
    console.error(error)
  }
}
getProduct()

const putData = async () => {
  try {
    isUpdateLoading.value = true
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('description', description.value)
    formData.append('categoryId', categoryId.value)
    formData.append('price', price.value)
    formData.append('stock', stock.value)
    formData.append('image', image.value)
    const response = await productAPI.updateProduct(id, formData)
    if (response.success) {
      window.alert('商品更新成功!')
      router.push('/seller')
    } else {
      window.alert('商品更新失敗，請稍後再試')
    }
  } catch (error) {
    console.error(error)
  } finally {
    isUpdateLoading.value = false
  }
}
const deleteProduct = async () => {
  try {
    if (window.confirm('確定要移除商品嗎？')) {
      isRemoveLoading.value = true
      const response = await productAPI.deleteProduct(id)
      if (response.success) {
        window.alert('商品移除成功')
      } else {
        window.alert('本商品已經被放入購物車或訂單，目前無法移除，建議您將商品下架')
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    isRemoveLoading.value = false
  }
}
</script>
<template>
  <div class="container mt-4 px-5">
    <h1 class="text-center mb-4">編輯商品</h1>
    <form @submit.prevent="putData">
      <div class="mb-3">
        <label for="name" class="form-label">商品名稱</label>
        <input v-model="name" type="text" class="form-control" id="name">
      </div>
      <div class="input-group mb-3">
        <label for="categoryName" class="input-group-text">選擇種類</label>
        <select v-model="categoryId" class="form-select" id="form-select">
          <option :value=categoryId v-if="categoryId">{{ categoryName }} (selected)</option>
          <option value="1">上衣類</option>
          <option value="2">下身類</option>
          <option value="3">內衣類</option>
          <option value="4">配件類</option>
          <option value="5">鞋類</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">商品敘述</label>
        <textarea v-model="description" class="form-control" id="description" rows="4"></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">商品價格</label>
        <input v-model="price" type="number" class="form-control" id="price">
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">商品庫存</label>
        <input v-model="stock" type="number" class="form-control" id="stock">
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">商品圖片</label>
        <input type="file" class="form-control" id="image" @change="handleImageChange">
        <img v-if="image" :src="imagePreview" alt="Selected Image" style="max-width: 200px;">
      </div>
      <button :disabled="isUpdateLoading" type="submit" class="btn btn-primary me-2">
        <span v-if="isUpdateLoading" class="spinner-border spinner-border-sm"></span>
        確認更新</button>
      <button :disabled="isRemoveLoading" type="reset" class="btn btn-danger" @click="deleteProduct">
        <span v-if="isRemoveLoading" class="spinner-border spinner-border-sm"></span>
        移除商品</button>
    </form>
  </div>
</template>
