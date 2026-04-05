<template>
  <nav class="navbar">
    <div class="nav-inner">
      <div class="logo">
        <img src="/logo/owlbook.png" alt="OwlBook" width="32">
        <span>OwlBook</span>
        <span class="role-tag" v-if="userStore.isLoggedIn" style="margin-left: 8px; font-size: 12px; color: var(--accent);">
          ({{ userStore.role.toUpperCase() }})
        </span>
      </div>
      
      <div :class="['menu', { active: isMenuOpen }]">
        <router-link to="/" @click="closeMenu">Home</router-link>
        
        <template v-if="userStore.role === 'member'">
          <router-link to="/favorites" @click="closeMenu">Favorites</router-link>
          <router-link to="/coin" @click="closeMenu">🪙 {{ userStore.coins }}</router-link>
        </template>

        <router-link v-if="['admin', 'provider'].includes(userStore.role)" to="/manage" @click="closeMenu">Dashboard</router-link>

        <router-link v-if="!userStore.isLoggedIn" to="/login" class="btn-login-nav" @click="closeMenu">Login</router-link>
        <button v-else @click="onLogout" class="logout-btn">Logout</button>
        
        <button @click="toggleTheme" class="theme-toggle">
          {{ isDark ? '🌙' : '☀️' }}
        </button>
      </div>

      <!-- Hamburger Icon -->
      <button :class="['nav-toggle', { active: isMenuOpen }]" @click="isMenuOpen = !isMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/userStore'
import "@/assets/styles/navbar.css"

const isDark = ref(false)
const isMenuOpen = ref(false)
const router = useRouter()

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

const closeMenu = () => { isMenuOpen.value = false; }

const onLogout = () => {
  closeMenu();
  userStore.logout()
  router.push('/login')
}
</script>