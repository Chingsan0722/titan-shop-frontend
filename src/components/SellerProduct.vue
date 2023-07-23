<script setup>
import { useProductStore } from '../stores/product'
import { productAPI } from '../api/product'
const productStore = useProductStore()
// eslint-disable-next-line vue/no-setup-props-destructure
const { product } = defineProps(['product'])
const deleteProduct = async () => {
  try {
    if (window.confirm('確定要移除商品嗎？')) {
      const response = await productAPI.deleteProduct(product.id)
      if (response.success) {
        window.alert('Delete successful')
        // location.reload()
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
</script>
<template>
  <th class="align-middle" scope="row">{{ product.id }}</th>
  <td class="align-middle">{{ product.name }}</td>
  <td class="align-middle">$ {{ product.price }}</td>
  <td class="align-middle">{{ product.description }}</td>
  <td class="align-middle">{{ product.stock }}</td>
  <td class="align-middle">{{ product.total_sold }}</td>
  <td class="align-middle">{{ product.total_sold * product.price }}</td>
  <td><router-link :to="`/product/edit/${product.id}`">
    <a class="btn btn-primary">編輯</a></router-link></td>
  <td><a class="btn btn-danger" @click="deleteProduct">移除</a></td>
</template>

<style>
</style>
