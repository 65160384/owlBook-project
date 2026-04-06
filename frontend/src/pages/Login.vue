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
            placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" minlength="6" class="form-input"
            placeholder="Enter your password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>

      <div class="dev-test-buttons" style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
        <button @click="email = 'admin@owlbook.com'; handleLogin()"
          style="font-size: 11px; padding: 5px; cursor: pointer;">Test Admin</button>
        <button @click="email = 'provider@owlbook.com'; handleLogin()"
          style="font-size: 11px; padding: 5px; cursor: pointer;">Test Provider</button>
        <button @click="email = 'user@test.com'; handleLogin()"
          style="font-size: 11px; padding: 5px; cursor: pointer;">Test Member</button>
      </div>

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
  userStore
} from '@/store/userStore';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const handleLogin = async () => {
  if (!email.value || !password.value) return;

  try {
    const res = await fetch(`${BACKEND}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const data = await res.json();

    if (res.ok) {
      userStore.login(data.token, data.role, data.coins);

      // Navigate based on role
      if (data.role === 'admin' || data.role === 'provider') {
        router.push('/manage');
      } else {
        router.push('/');
      }
    } else {
      errorMessage.value = data.error || 'Invalid login details';
    }
  } catch (error) {
    errorMessage.value = 'Failed to connect to the server.';
  }
};
</script>

<style scoped>
@import '@/assets/styles/login.css';
</style>