<script setup></script>
<template>
  <div class="container mt-4 px-5">
    <h1 class="text-center mb-4">新增商品</h1>
    <form>
      <div class="mb-3">
        <label for="product-name" class="form-label">商品名稱</label>
        <input type="text" class="form-control" id="product-name" placeholder="Enter product name">
      </div>
      <div class="mb-3">
        <label for="product-description" class="form-label">商品敘述</label>
        <textarea class="form-control" id="product-description" rows="4" placeholder="Enter product description"></textarea>
      </div>
      <div class="mb-3">
        <label for="product-price" class="form-label">商品價格</label>
        <input type="number" class="form-control" id="product-price" placeholder="Enter product price">
      </div>
      <div class="mb-3">
        <label for="product-quantity" class="form-label">商品數量</label>
        <input type="number" class="form-control" id="product-quantity" placeholder="Enter product quantity">
      </div>
      <div class="mb-3">
        <label for="product-image" class="form-label">商品圖片</label>
        <input type="file" class="form-control" id="product-image">
      </div>
      <button type="submit" class="btn btn-primary me-2">確認新增</button>
      <button type="reset" class="btn btn-danger">清空</button>
    </form>
  </div>
</template>
