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
const id = route.currentRoute._value.params.id
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    image.value = URL.createObjectURL(file)
  }
  console.log(image.value)
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
      console.log(categoryName.value)
    } else {
      window.alert('Failed to get product', response.error)
    }
  } catch (error) {
    console.error(error)
  }
}
getProduct()

const putData = async () => {
  try {
    const response = await productAPI.updateProduct(id, {
      name: name.value,
      categoryId: categoryId.value,
      description: description.value,
      price: price.value,
      stock: stock.value
    })
    if (response.success) {
      window.alert('Product updated successfully!')
      router.push('/seller')
    } else {
      window.alert('Failed to update product:', response.error)
    }
  } catch (error) {
    console.error(error)
  }
}
const deleteProduct = async () => {
  try {
    if (window.confirm('確定要移除商品嗎？')) {
      const response = await productAPI.deleteProduct(id)
      if (response.success) {
        window.alert('Delete successful')
      } else {
        window.alert(`${response.error.response.data}`)
      }
    }
  } catch (error) {
    console.error(error)
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
        <img v-if="image" :src="image" alt="Selected Image" style="max-width: 200px;">
      </div>
      <button type="submit" class="btn btn-primary me-2">確認更新</button>
      <button type="reset" class="btn btn-danger" @click="deleteProduct">移除商品</button>
    </form>
  </div>
</template>
