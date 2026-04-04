import { createRouter, createWebHistory } from "vue-router"
import { mockUserStore } from "@/store/mockUserStore"

import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import CoinPage from "../pages/CoinPage.vue"
import ComicDetail from "../pages/ComicDetail.vue"
import Reader from "../pages/Reader.vue"
import Favorites from "../pages/Favorites.vue"
import ManageComics from "../pages/ManageComics.vue"
import EpisodeManager from "../pages/EpisodeManager.vue"
import PaymentSuccess from "../pages/PaymentSuccess.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/coin", component: CoinPage, meta: { requiresAuth: true, role: 'member' } },
  { path: "/favorites", component: Favorites, meta: { requiresAuth: true, role: 'member' } },
  { path: "/comic/:id", component: ComicDetail },
  { path: "/reader/:comic/:episode/:page?", component: Reader },
  { path: "/manage", component: ManageComics, meta: { requiresAuth: true, role: ['admin', 'provider'] } },
  
  // เพิ่ม name: 'EpisodeManager' เพื่อให้หน้า ManageComics เรียกใช้ได้ง่ายๆ
  { 
    name: 'EpisodeManager',
    path: "/manage/:comicId/episodes", 
    component: EpisodeManager, 
    props: true, 
    meta: { requiresAuth: true, role: ['admin', 'provider'] } 
  },
  
  { path: "/payment/success", component: PaymentSuccess }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ระบบตรวจสอบสิทธิ์ (RBAC) ตาม Activity Diagram
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!mockUserStore.isLoggedIn) return next('/login');
    const role = mockUserStore.role;
    if (Array.isArray(to.meta.role)) {
      if (!to.meta.role.includes(role)) return next('/');
    } else if (to.meta.role && role !== to.meta.role) {
      return next('/');
    }
  }
  next();
})

export default router