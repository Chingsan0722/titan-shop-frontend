<script setup>
import { ref } from 'vue'
import { orderAPI } from '../api/order'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '../stores/order'
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()
const orderStore = useOrderStore()
const router = useRouter()
// eslint-disable-next-line vue/no-setup-props-destructure
const shippingFee = 60
const { isSubtotalLoading } = storeToRefs(cartStore)
const isLoading = ref(false)
const postOrder = async () => {
  try {
    if (window.confirm('確定要送出訂單嗎')) {
      isLoading.value = true
      const response = await orderAPI.addToOrder()
      if (response) {
        orderStore.setOrderId(response[0].orderId)
        window.alert('訂購成功!')
        router.push('/checkout')
      } else {
        window.alert('訂購失敗')
      }
    }
  } catch (error) {
    console.error(error)
    window.alert('訂購失敗，請重新嘗試')
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">總計</h5>
      <ul class="list-group">
        <li :disabled="isSubtotalLoading" class="list-group-item d-flex justify-content-between align-items-center">
          總金額:
          <span v-if="isSubtotalLoading" class="spinner-border spinner-border-sm"></span>
          <span v-else>${{ cartStore.totalAmount }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          運費:<span>${{ cartStore.totalAmount ? shippingFee : 0}}</span>
        </li>
        <li :disabled="isSubtotalLoading" class="list-group-item d-flex justify-content-between align-items-center">
          結帳金額:
          <span v-if="isSubtotalLoading" class="spinner-border spinner-border-sm"></span>
          <span v-else>${{ cartStore.totalAmount ? cartStore.totalAmount + shippingFee : 0 }}</span>
        </li>
      </ul>
      <div class="text-end">
        <a :disabled="isLoading" class="btn btn-primary btn-block mt-3" @click="postOrder">
          <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
          結帳</a>
      </div>
    </div>
  </div>
</template>
