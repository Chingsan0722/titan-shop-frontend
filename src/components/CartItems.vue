<script setup>
</script>
<template>
  <div class="card">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">商品名稱</th>
            <th scope="col">金額</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Product 1</td>
            <td>$10</td>
            <td>
              <input type="number" class="form-control" value="1" min="1">
            </td>
            <td>$10</td>
            <td>
              <button class="btn btn-danger btn-sm">移除商品</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Product 2</td>
            <td>$15</td>
            <td>
              <input type="number" class="form-control" value="2" min="1">
            </td>
            <td>$30</td>
            <td>
              <button class="btn btn-danger btn-sm">移除商品</button>
            </td>
          </tr>
          <!-- 添加其他商品行 -->
        </tbody>
      </table>
    </div>
  </div>
</template>
