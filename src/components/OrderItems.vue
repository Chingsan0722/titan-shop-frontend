<script setup>
// eslint-disable-next-line vue/no-setup-props-destructure
const { order } = defineProps(['order'])
</script>

<template>
  <tr>
    <th scope="row">{{ order.productId }}</th>
    <td>{{ order.name }}</td>
    <td>{{ order.quantity }} 件</td>
    <td>{{ order.price }} $</td>
    <td>{{ order.subtotal }} $</td>
  </tr>
</template>
