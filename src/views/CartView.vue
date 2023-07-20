<script setup>
import CartItems from '../components/CartItems.vue'
import CartSummary from '../components/CartSummary.vue'
import { cartAPI } from '../api/cart'
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const getCart = async () => {
  const result = await cartAPI.getCart()
  console.log(result)
}
getCart()
</script>
<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">購物車</h1>
    <div class="row">
      <div class="col-md-8">
        <CartItems/>
      </div>
      <div class="col-md-4">
        <CartSummary/>
      </div>
    </div>
  </div>

</template>
