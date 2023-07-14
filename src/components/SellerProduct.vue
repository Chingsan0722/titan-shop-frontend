<script setup>
</script>
<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th  scope="col">商品編號</th>
        <th scope="col">商品名稱</th>
        <th scope="col">商品金額</th>
        <th scope="col">商品簡述</th>
        <th scope="col">庫存剩餘</th>
        <th scope="col">歷史銷量</th>
        <th scope="col">銷售額</th>
        <th scope="col">編輯</th>
        <th scope="col">下架</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="align-middle" scope="row">1</th>
        <td class="align-middle">磚頭</td>
        <td class="align-middle">$ 99</td>
        <td class="align-middle">nice brick</td>
        <td class="align-middle">10</td>
        <td class="align-middle">1290</td>
        <td class="align-middle">129,000</td>
        <td><button class="btn btn-primary">編輯</button></td>
        <td><button class="btn btn-danger">下架</button></td>
      </tr>
    </tbody>
  </table>
</template>

<style>
</style>
