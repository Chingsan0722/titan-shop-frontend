<script setup>
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()
// eslint-disable-next-line vue/no-setup-props-destructure
const shippingFee = 60
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">總計</h5>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          總金額:<span>${{ cartStore.totalAmount }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          運費:<span>${{ cartStore.totalAmount ? shippingFee : 0}}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          結帳金額:<span>${{ cartStore.totalAmount ? cartStore.totalAmount + shippingFee : 0 }}</span>
        </li>
      </ul>
      <div class="text-end">
        <a class="btn btn-primary btn-block mt-3" href="/checkout">結帳</a>
      </div>
    </div>
  </div>
</template>
