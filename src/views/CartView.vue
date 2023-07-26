<script setup>
import CartItems from '../components/CartItems.vue'
import CartSummary from '../components/CartSummary.vue'
import { cartAPI } from '../api/cart'
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()
const getCart = async () => {
  const response = await cartAPI.getCart()
  if (response) {
    cartStore.setCarts(response)
  } else {
    console.error('Get carts failed')
  }
}
getCart()
const clearCart = async () => {
  if (window.confirm('確定要清空嗎？')) {
    const responseA = await cartAPI.deleteAllCart()
    if (responseA) {
      window.alert('購物車已清空')
      const responseB = await cartAPI.getCart()
      if (responseB) {
        cartStore.setCarts(responseB)
      } else {
        console.error('Get carts failed')
      }
    }
  }
}
</script>
<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">購物車</h1>
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">商品種類</th>
                  <th scope="col">商品名稱</th>
                  <th scope="col">金額</th>
                  <th scope="col">數量</th>
                  <th scope="col">庫存</th>
                  <th scope="col">小計</th>
                  <th scope="col">移除商品</th>
                </tr>
              </thead>
              <tbody>
                <CartItems v-for="cart in cartStore.carts" :key="cart.productId" :cart="cart"/>
              </tbody>
            </table>
            <div class="text-center">
              <button class="btn btn-info btn-sm m-1" @click="clearCart">清空購物車</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <CartSummary/>
      </div>
    </div>
  </div>

</template>
