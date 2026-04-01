<template>
  <div class="login-container">
    <div class="login-form-card">
      <h2>Login</h2>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-input"
            placeholder="example@owlbook.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="login-button">Login</button>
      </form>

      <div class="register-link-container">
        <p>Don't have an account?</p>
        <router-link to="/register">Register now</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useUserStore } from '@/store/userStore'; // TODO: เปิดคอมเมนต์เมื่อ Dev พร้อมใช้งาน Pinia

const router = useRouter();
// const userStore = useUserStore(); // TODO: เปิดคอมเมนต์เมื่อพร้อม

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';

  // สำหรับ Dev 3: นำข้อมูลนี้ไปเรียก api.js และเก็บ Token ใน userStore.js
  // console.log('Login attempt:', { email: email.value, password: password.value });

  try {
    // จำลองว่าสำเร็จ
    const success = true;

    if (success) {
      // Login สำเร็จ ไปที่หน้าหลัก
      router.push('/');
    } else {
      errorMessage.value = 'Invalid email or password.';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again later.';
  }
};
</script>

<style scoped>

@import '@/assets/styles/login.css';
</style>