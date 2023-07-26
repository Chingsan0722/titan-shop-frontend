<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { cartAPI } from '../api/cart'
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()
// eslint-disable-next-line vue/no-setup-props-destructure
const { cart } = defineProps(['cart', 'subtotal'])
const quantity = ref(cart.quantity)
const { isLoading } = storeToRefs(cartStore)
watch(quantity, async (newValue, oldValue) => {
  isLoading.value = true
  try {
    const responseA = await cartAPI.updateCart(cart.productId, { quantity: newValue })
    console.log(responseA)
    if (!responseA.success) {
      window.alert('庫存不足')
    }
    const responseB = await cartAPI.getCart()
    if (responseB) {
      cartStore.setCarts(responseB)
    } else {
      console.error('Get carts failed')
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
const removeCartItem = async () => {
  if (window.confirm(`確定要移除${cart.productName}嗎？`)) {
    const responseA = await cartAPI.deleteCart(cart.productId)
    if (responseA) {
      window.alert('Delete success!')
      const responseB = await cartAPI.getCart()
      if (responseB) {
        cartStore.setCarts(responseB)
      } else {
        console.error('Get carts failed')
      }
    } else {
      window.alert('Delete failed!')
    }
  }
}
</script>
<template>
  <tr>
    <td>{{cart.categoryName}}</td>
    <td>{{ cart.productName }}</td>
    <td>${{ cart.price }}</td>
    <td>
      <input type="number" class="form-control" v-model="quantity" :placeholder="quantity" min="1" :max="cart.stock">
    </td>
    <td>{{ cart.stock }}</td>
    <td :disabled="isLoading">
      <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
      <span v-else >${{ cart.subTotal }}</span>
    </td>
    <td>
      <button class="btn btn-danger btn-sm" @click="removeCartItem(cart.id)">移除</button>
    </td>
  </tr>
</template>
