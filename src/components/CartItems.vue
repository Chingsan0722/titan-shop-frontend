<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { cartAPI } from '../api/cart'
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()
// eslint-disable-next-line vue/no-setup-props-destructure
const { cart } = defineProps(['cart', 'subtotal'])
const { isSubtotalLoading } = storeToRefs(cartStore)
const isRemoveLoading = ref(false)
const quantity = ref(cart.quantity)
watch(quantity, async (newValue, oldValue) => {
  try {
    isSubtotalLoading.value = true
    const responseA = await cartAPI.updateCart(cart.productId, { quantity: newValue })
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
    isSubtotalLoading.value = false
  }
})
const removeCartItem = async () => {
  try {
    if (window.confirm(`確定要移除${cart.productName}嗎？`)) {
      isRemoveLoading.value = true
      const responseA = await cartAPI.deleteCart(cart.productId)
      if (responseA) {
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
  } catch (error) {
    console.error(error)
    isRemoveLoading.value = false
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
    <td :disabled="isSubtotalLoading">
      <span v-if="isSubtotalLoading" class="spinner-border spinner-border-sm"></span>
      <span v-else >${{ cart.subTotal }}</span>
    </td>
    <td>
      <button :disabled="isRemoveLoading" class="btn btn-danger btn-sm" @click="removeCartItem(cart.id)">
        <span v-if="isRemoveLoading" class="spinner-border spinner-border-sm"></span>
        移除</button>
    </td>
  </tr>
</template>
