<script setup>
import { ref, watch } from 'vue'
import { cartAPI } from '../api/cart'
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()
// eslint-disable-next-line vue/no-setup-props-destructure
const { cart } = defineProps(['cart', 'subtotal'])
const quantity = ref(cart.quantity)
watch(quantity, async (newValue, oldValue) => {
  const responseA = await cartAPI.updateCart(cart.productId, { quantity: newValue })
  if (!responseA) {
    window.alert('update failed')
  }
  const responseB = await cartAPI.getCart()
  if (responseB) {
    cartStore.setCarts(responseB)
  } else {
    console.error('Get carts failed')
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
      <input type="number" class="form-control" v-model="quantity" :placeholder="quantity" min="1">
    </td>
    <td>${{ cart.subTotal }}</td>
    <td>
      <button class="btn btn-danger btn-sm" @click="removeCartItem(cart.id)">移除</button>
    </td>
  </tr>
</template>
