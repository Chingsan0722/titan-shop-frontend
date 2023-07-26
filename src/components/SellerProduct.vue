<script setup>
import { watch } from 'vue'
import { useProductStore } from '../stores/product'
import { productAPI } from '../api/product'
const productStore = useProductStore()

// eslint-disable-next-line vue/no-setup-props-destructure
const { product } = defineProps(['product'])
const reactProduct = productStore.products.find((item) => item.id === product.id)
const deleteProduct = async () => {
  try {
    if (window.confirm('確定要移除商品嗎？')) {
      const response = await productAPI.deleteProduct(product.id)
      if (response.success) {
        window.alert('Delete successful')
        const index = productStore.products.findIndex((item) => item.id === product.id)
        if (index !== -1) {
          productStore.products.splice(index, 1)
        }
      } else {
        window.alert(`${response.error.response.data}`)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
const changeAvailable = async () => {
  if (product.available) {
    window.confirm('確定要更改為下架嗎')
  } else {
    window.confirm('確定要更改為上架嗎')
  }
  const isAvailable = product.available
  const response = await productAPI.updateProduct(product.id, { available: !isAvailable })
  if (response.success) {
    const responseB = await productAPI.getAllProducts()
    if (responseB.success) productStore.setProducts(responseB.data)
    window.alert('已更改')
  } else {
    window.alert('失敗')
  }
}

watch(() => productStore.products, (newValue) => {
  const newProd = newValue.find((product) => product.id === reactProduct.id)
  reactProduct.available = newProd.available
})
</script>
<template>
  <th class="align-middle" scope="row">{{ product.id }}</th>
  <td class="align-middle">{{ product.name }}</td>
  <td class="align-middle">{{ product.categoryName }}</td>
  <td class="align-middle">$ {{ product.price }}</td>
  <td class="align-middle">{{ product.description }}</td>
  <td class="align-middle">{{ product.stock }}</td>
  <td class="align-middle">{{ product.totalSold || 0 }}</td>
  <td class="align-middle">{{ product.totalSold * product.price || 0 }}</td>
  <td class="align-middle">
    <button v-if="reactProduct.available" class="btn btn-info" @click="changeAvailable">上架中</button>
    <button v-else class="btn btn-secondary" @click="changeAvailable">已下架</button>
  </td>
  <td><router-link :to="`/product/edit/${product.id}`">
    <a class="btn btn-primary">編輯</a></router-link></td>
  <td><a class="btn btn-danger" @click="deleteProduct">移除</a></td>
</template>

<style>
</style>
