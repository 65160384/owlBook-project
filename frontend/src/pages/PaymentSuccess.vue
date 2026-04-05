<template>
  <div class="main-container">
    <div class="success-card">
      <div class="icon-wrapper"><span class="checkmark">✔</span></div>
      <h1>Payment Successful!</h1>
      <p class="description">ขอบคุณสำหรับการสนับสนุน เหรียญของคุณถูกเติมเข้าระบบเรียบร้อยแล้ว</p>
      
      <div class="order-details">
        <div class="detail-item coins-highlight">
          <span>Amount Topped Up:</span>
          <strong>+ {{ coinAmount }} Coins</strong>
        </div>
        <div class="detail-item">
          <span>Transaction Date:</span>
          <strong>{{ transactionDate }}</strong>
        </div>
        <div class="detail-item">
          <span>Transaction ID:</span>
          <strong>#OWL-{{ transactionId }}</strong>
        </div>
        <div class="detail-item">
          <span>Status:</span>
          <span class="status-success">Completed</span>
        </div>
      </div>

      <div class="action-buttons">
        <router-link to="/coin" class="btn-primary">Back to Wallet</router-link>
        <router-link to="/" class="btn-secondary">Go to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import "@/assets/styles/payment-success.css"

const route = useRoute();
const transactionId = ref(Math.floor(Math.random() * 1000000));
const transactionDate = ref('');
const coinAmount = ref(0);

onMounted(() => {
  document.title = "Payment Success - OwlBook";
  
  // ตั้งค่าวันที่และเวลาปัจจุบัน
  const now = new Date();
  transactionDate.value = now.toLocaleDateString('th-TH') + ' ' + now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

  // ดึงยอดเหรียญจาก query parameter เช่น /payment/success?amount=500
  coinAmount.value = route.query.amount || 100;
});
</script>