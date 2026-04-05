<template>
  <div class="register-container">
    <div class="register-form-card">
      <h2>Register</h2>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="reg-email">Email:</label>
          <input
            id="reg-email"
            v-model="email"
            type="email"
            class="form-input"
            placeholder="example@owlbook.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="reg-password">Password:</label>
          <input
            id="reg-password"
            v-model="password"
            type="password"
            minlength="8"
            class="form-input"
            placeholder="Create a strong password (8+ characters)"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirm PW:</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            class="form-input"
            placeholder="Repeat password"
            required
          />
        </div>

        <button type="submit" class="register-button">Register</button>
      </form>

      <div class="login-link-container">
        <p>Already have an account?</p>
        <router-link to="/login">Login now</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useUserStore } from '@/store/userStore'; // TODO: เปิดคอมเมนต์เมื่อ Dev 3 พร้อมใช้งาน Pinia

const router = useRouter();
// const userStore = useUserStore(); // TODO: เปิดคอมเมนต์เมื่อพร้อม

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
  errorMessage.value = '';

  // ตรวจสอบรหัสผ่านตรงกันก่อน (ทำที่ frontend)
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  // สำหรับ Dev: นำข้อมูลนี้ไปเรียก api.js (Endpoint สมัครสมาชิก) และเก็บ Token ใน userStore.js
  // console.log('Register attempt:', { email: email.value, password: password.value });

  try {
    // จำลองว่าสำเร็จ
    const success = true;

    if (success) {
      // สมัครสำเร็จ ไปที่หน้าหลัก
      router.push('/');
    } else {
      errorMessage.value = 'Email already exists or invalid data.';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during registration. Please try again.';
  }
};
</script>

<style scoped>
@import '@/assets/styles/register.css';
</style>