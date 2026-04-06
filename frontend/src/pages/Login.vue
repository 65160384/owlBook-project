<template>
  <div class="login-container">
    <div class="login-form-card">
      <h2>Login</h2>
      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" class="form-input"
            placeholder="admin@owlbook.com / provider@test.com" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" minlength="6" class="form-input"
            placeholder="Enter your password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>

      <!-- <div class="dev-test-buttons" style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
        <button @click="email = 'admin@owlbook.com'; handleLogin()"
          style="font-size: 11px; padding: 5px; cursor: pointer;">Test Admin</button>
        <button @click="email = 'provider@owlbook.com'; handleLogin()"
          style="font-size: 11px; padding: 5px; cursor: pointer;">Test Provider</button>
        <button @click="email = 'user@test.com'; handleLogin()"
          style="font-size: 11px; padding: 5px; cursor: pointer;">Test Member</button>
      </div> -->

      <div class="register-link-container">
        <p>Don't have an account?</p>
        <router-link to="/register">Register now</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref
} from 'vue';
import {
  useRouter
} from 'vue-router';
import {
  mockUserStore
} from '@/store/mockUserStore';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = () => {
  if (!email.value || !password.value) return;

  // Logic แยก Role สำหรับทดสอบ
  let role = 'member';
  if (email.value.includes('admin')) role = 'admin';
  else if (email.value.includes('provider')) role = 'provider';

  mockUserStore.login(role);

  // ถ้าเป็น Admin/Provider ให้ไปหน้าจัดการ
  if (role === 'admin' || role === 'provider') {
    router.push('/manage');
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
@import '@/assets/styles/login.css';
</style>