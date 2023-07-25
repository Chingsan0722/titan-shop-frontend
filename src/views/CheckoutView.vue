<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userInfo'
import { useOrderStore } from '../stores/order'
import { orderAPI } from '../api/order'
import OrderItems from '../components/OrderItems.vue'
const userStore = useUserStore()
const orderStore = useOrderStore()
const totalAmount = ref()
const getOrders = async () => {
  const response = await orderAPI.getOrder(orderStore.orderId)
  if (response) {
    orderStore.setOrders(response)
    totalAmount.value = response.reduce((total, order) => total + order.subtotal, 0)
  }
}
getOrders()
</script>
<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-md-center">
      <div class="text-end col-6 p-2">
        <div class="text-start">{{ userStore.name }}您好，感謝您的訂購，我們正在處理您的訂單，以下是您的訂購明細</div>
        <table class="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">商品名稱</th>
              <th scope="col">商品數量</th>
              <th scope="col">商品單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <OrderItems v-for="order in orderStore.orders" :key="order.productId" :order="order"/>
            <tr>
              <th scope="row" colspan="3"></th>
              <td scope="col">運費：</td>
              <td scope="col">60 $</td>
            </tr>
            <tr>
              <th scope="row" colspan="3"></th>
              <td scope="col">總金額：</td>
              <td scope="col">{{ totalAmount + 60 }} $</td>
            </tr>
          </tbody>
        </table>
        <h5 class="text-center">試營運期間，本館商品全部免費（但也不會寄出喔 ^_^）歡迎參觀選購</h5>
      </div>
    </div>
    <div class="text-center align-items-center pt-5">
      <img src="https://memeprod.ap-south-1.linodeobjects.com/user-maker-thumbnail/f65bfb27f15b1765c648313e06cb0a51.gif">
    </div>
    <div class="text-center pt-2">
      <h1>佛心公司! 佛心公司!
      </h1>
    </div>
    <div class="text-center">
      <a class="btn btn-lg btn-dark" href="/">還不回去買爆 ?</a>
    </div>
  </div>
</template>
