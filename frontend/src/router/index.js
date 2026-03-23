import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import CoinPage from "../pages/CoinPage.vue"
import ComicDetail from "../pages/ComicDetail.vue"
import Reader from "../pages/Reader.vue"
import Favorites from "../pages/Favorites.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/coin", component: CoinPage },
  { path: "/favorites", component: Favorites },
  { path: "/comic/:id", component: ComicDetail },

  { path: "/reader/:comic/:episode/:page?", component: Reader }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router