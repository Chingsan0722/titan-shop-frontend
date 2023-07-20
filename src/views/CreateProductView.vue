<script setup>
import { productAPI } from '../api/product'
import { ref } from 'vue'
// import axios from 'axios'
const name = ref('')
const categoryId = ref('2')
const description = ref('')
const price = ref()
const stock = ref()
const image = ref(null)
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    image.value = URL.createObjectURL(file)
  }
  console.log(image.value)
}
const postData = async () => {
  try {
    // const formData = new FormData()
    // formData.append('name', name.value)
    // formData.append('description', description.value)
    // formData.append('categoryId', categoryId.value)
    // formData.append('price', price.value)
    // formData.append('stock', stock.value)
    // formData.append('image', image.value)
    const response = await productAPI.addProduct({
      name: name.value,
      categoryId: categoryId.value,
      description: description.value,
      price: price.value,
      stock: stock.value
    })
    // 上傳圖片失敗
    // const response = await axios.post('http://localhost:80/api/products', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InNlbGxlcjAwMSIsImFjY291bnQiOiJzZWxsZXIwMDEiLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTE4VDE1OjEzOjQ3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTE4VDE1OjEzOjQ3LjAwMFoiLCJpYXQiOjE2ODk4NjAxNjIsImV4cCI6MTY5MDQ2NDk2Mn0.NYqI-DkEMuOqLJn6aebFhqYFiEY8ueJ5v3h4rXV5u_M'
    //   }
    // })
    if (response.success) {
      // Clear the form after successful submission
      name.value = ''
      description.value = ''
      price.value = 0
      stock.value = 0
      image.value = null

      // Show a success message (You can handle this using a toast or a modal)
      console.log(response.data)
      window.alert('Product added successfully!')
    } else {
      // Handle the error response from the server (e.g., display an error message)
      window.alert('Failed to add product:', response.error)
    }
  } catch (error) {
    console.error(error)
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
        <img v-if="image" :src="image" alt="Selected Image" style="max-width: 200px;">
      </div>
      <button type="submit" class="btn btn-primary me-2">確認新增</button>
      <button type="reset" class="btn btn-danger">清空</button>
    </form>
  </div>
</template>
