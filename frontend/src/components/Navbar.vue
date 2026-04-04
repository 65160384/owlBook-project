<template>
  <nav class="navbar">
    <div class="nav-inner">
      <div class="logo">
        <img src="/logo/owlbook.png" alt="OwlBook" width="32">
        <span>OwlBook</span>
        <span class="role-tag" v-if="mockUserStore.isLoggedIn" style="margin-left: 8px; font-size: 12px; color: var(--accent);">
          ({{ mockUserStore.role.toUpperCase() }})
        </span>
      </div>
      
      <div class="menu">
        <router-link to="/">Home</router-link>
        
        <template v-if="mockUserStore.role === 'member'">
          <router-link to="/favorites">Favorites</router-link>
          <router-link to="/coin">🪙 {{ mockUserStore.coins }}</router-link>
        </template>

        <router-link v-if="['admin', 'provider'].includes(mockUserStore.role)" to="/manage">Dashboard</router-link>

        <router-link v-if="!mockUserStore.isLoggedIn" to="/login" class="btn-login-nav">Login</router-link>
        <button v-else @click="handleLogout" class="logout-btn">Logout</button>
        
        <button @click="toggleTheme" class="theme-toggle">
          {{ isDark ? 'Dark 🌙' : 'Light ☀️' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockUserStore } from '@/store/mockUserStore'
import "@/assets/styles/navbar.css"

const isDark = ref(false)
const router = useRouter()

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

const handleLogout = () => {
  mockUserStore.logout()
  router.push('/login')
}
</script>