import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '../views/ShopView.vue';
import AdminLayout from "../views/admin/AdminLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: '/admin/products',
          name: 'products',
          component: () => import('../views/admin/ProductsView.vue')
        },
        {
          path: '/admin/products/nuevo',
          name: 'new-product',
          component: () => import('../views/admin/NewProductView.vue')
        },
        {
          path: '/admin/products/editar:id',
          name: 'edit-product',
          component: () => import('../views/admin/EditProductView.vue')
        },
        {
          path: '/admin/products/seeder',
          name: 'seed-products',
          component: () => import('../views/admin/SeederView.vue')
        },
        {
          path: '/admin/sales',
          name: 'sales',
          component: () => import('../views/admin/SalesView.vue')
        }
      ]
    }
  ]
})

export default router
