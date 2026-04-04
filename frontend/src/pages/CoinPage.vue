<template>
  <div class="main-container">
    <div class="coin-card">
      <h2>💰 My Wallet</h2>
      <div class="balance-display">
        <span class="coin-amount">{{ mockUserStore.coins }}</span>
        <span class="coin-label">Coins</span>
      </div>

      <div class="topup-options">
        <h3>Select Top-up Amount</h3>
        <div class="options-grid">
          <button v-for="option in topUpOptions" :key="option.amount" @click="topUp(option.amount)" class="option-btn">
            <div class="opt-coins">{{ option.amount }} Coins</div>
            <div class="opt-price">฿{{ option.price }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mockUserStore } from '@/store/mockUserStore';
import "@/assets/styles/coin-page.css"
import { useRouter } from 'vue-router';
const router = useRouter();

const topUpOptions = [
  { amount: 50, price: 50 },
  { amount: 100, price: 90 },
  { amount: 300, price: 250 },
  { amount: 500, price: 400 }
];

// แก้ไขส่วนนี้ใน <script setup> ของ CoinPage.vue
const topUp = (amount) => {
  if (confirm(`ยืนยันการเติมเงิน ฿${amount}?`)) {
    // 1. เพิ่มเหรียญลงใน Store (ตาม Logic เดิมของคุณ)
    mockUserStore.coins += amount; 
    
    // 2. แก้ไข: ส่งค่า amount ไปกับ URL เพื่อให้หน้า Success แสดงค่าที่ถูกต้อง
    router.push({ 
      path: '/payment/success', 
      query: { amount: amount } 
    });
  }
};
</script>

