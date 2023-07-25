<script setup>
import { orderAPI } from '../api/order'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../stores/order'
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()
const orderStore = useOrderStore()
const router = useRouter()
// eslint-disable-next-line vue/no-setup-props-destructure
const shippingFee = 60
const postOrder = async () => {
  if (window.confirm('確定要送出訂單嗎')) {
    const response = await orderAPI.addToOrder()
    if (response) {
      orderStore.setOrderId(response[0].orderId)
      // console.log(orderStore.orderId)
      window.alert('訂購成功!')
      router.push('/checkout')
    } else {
      window.alert('訂購失敗')
    }
  }
}
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
        <a class="btn btn-primary btn-block mt-3" @click="postOrder">結帳</a>
      </div>
    </div>
  </div>
</template>
