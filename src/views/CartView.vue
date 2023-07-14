<script setup>
import CartItems from '../components/CartItems.vue'
import CartSummary from '../components/CartSummary.vue'
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
