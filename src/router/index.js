import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import CartView from '../views/CartView.vue'
import ProductView from '../views/ProductView.vue'
import CreateProductView from '../views/CreateProductView.vue'
import SellerView from '../views/SellerView.vue'
import CheckoutView from '../views/CheckoutView.vue'
const router = createRouter({
  // history幹啥的？
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/seller',
      name: 'seller',
      component: SellerView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/product/new',
      name: 'create-product',
      component: CreateProductView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
