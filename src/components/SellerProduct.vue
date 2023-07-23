<script setup>
import { useProductStore } from '../stores/product'
import { productAPI } from '../api/product'
// import { storeToRefs } from 'pinia'/

const productStore = useProductStore()
// const { product } = storeToRefs(productStore)

// eslint-disable-next-line vue/no-setup-props-destructure
const { product } = defineProps(['product'])
// const getData = async () => {
//   const result = await productAPI.getProduct(id)
//   if (result.success) {
//     productStore.setData(result.data[0])
//   } else {
//     console.error('Get product failed', result.error)
//   }
// }
// getData()
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
  const isAvailable = !product.available
  console.log(isAvailable)
  const response = await productAPI.updateProduct(product.id, { available: isAvailable })
  if (response.success) {
    window.alert('已更改')
  } else {
    window.alert('失敗')
  }
}

</script>
<template>
  <th class="align-middle" scope="row">{{ product.id }}</th>
  <td class="align-middle">{{ product.name }}</td>
  <td class="align-middle">{{ product.categoryName }}</td>
  <td class="align-middle">$ {{ product.price }}</td>
  <td class="align-middle">{{ product.description }}</td>
  <td class="align-middle">{{ product.stock }}</td>
  <td class="align-middle">{{ product.total_sold || 0 }}</td>
  <td class="align-middle">{{ product.total_sold * product.price || 0 }}</td>
  <td class="align-middle">
    <button v-if="product.available" class="btn btn-info" @click="changeAvailable">上架中</button>
    <button v-else class="btn btn-info" @click="changeAvailable">已下架</button>
  </td>
  <td><router-link :to="`/product/edit/${product.id}`">
    <a class="btn btn-primary">編輯</a></router-link></td>
  <td><a class="btn btn-danger" @click="deleteProduct">移除</a></td>
</template>

<style>
</style>
