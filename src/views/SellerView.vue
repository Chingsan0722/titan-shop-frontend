<script setup>
import { watch } from 'vue'
import SellerProduct from '../components/SellerProduct.vue'
import BtnGroup from '../components/BtnGroup.vue'
import { useProductStore } from '../stores/product'
import { productAPI } from '../api/product'
import { useRouter } from 'vue-router'
const router = useRouter()
const productStore = useProductStore()
const getData = async () => {
  const result = await productAPI.getAllProducts()
  if (result) {
    productStore.setProducts(result.data)
  } else {
    console.error('Get products failed', result.error)
  }
}
getData()
function newProductPage () {
  router.push('/product/new')
}
watch(() => productStore.sellerSort, (newValue) => {
  switch (newValue) {
    case 'default': {
      const defaultProducts = [...productStore.products].sort((a, b) => {
        return a.id - b.id
      })
      productStore.setProducts(defaultProducts)
      break
    }
    case 'totalAmount' : {
      const totalAmountProducts = [...productStore.products].sort((a, b) => {
        return (b.totalSold * b.price) - (a.totalSold * a.price)
      })
      productStore.setProducts(totalAmountProducts)
      break
    }
    case 'totalSold' : {
      const totalSoldProducts = [...productStore.products].sort((a, b) => {
        return b.totalSold - a.totalSold
      })
      productStore.setProducts(totalSoldProducts)
      break
    }
    case 'stockLeft' : {
      const stockLeftProducts = [...productStore.products].sort((a, b) => {
        return b.stock - a.stock
      })
      productStore.setProducts(stockLeftProducts)
      break
    }
    default: {
      const defaultProducts = [...productStore.products].sort((a, b) => {
        return b.id - a.id
      })
      productStore.setProducts(defaultProducts)
      break
    }
  }
})
</script>
<template>
  <div class="container mt-5">
    <div class="text-center">
      <h1>銷售者管理頁面</h1>
    </div>
    <div class="d-flex">
      <div class="p-2"><h3>商品清單</h3></div>
      <div class="p-2"><BtnGroup/></div>
      <div class="p-2">
        <a class="btn btn-dark" href="#" @click="newProductPage">新增商品</a>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">商品編號</th>
          <th scope="col">商品名稱</th>
          <th scope="col">商品分類</th>
          <th scope="col">商品金額</th>
          <th scope="col">商品簡述</th>
          <th scope="col">庫存剩餘</th>
          <th scope="col">歷史銷量</th>
          <th scope="col">銷售額</th>
          <th scope="col">狀態</th>
          <th scope="col">編輯</th>
          <th scope="col">移除</th>
        </tr>
      </thead>
      <div v-if="productStore.products.length === 0" class="m-2 text-start"><h5>還沒建立商品喔</h5></div>
      <tbody>
        <tr v-for="product in productStore.products" :key="product.id">
          <SellerProduct :product="product"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>
