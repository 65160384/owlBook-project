<template>
  <div class="main-container">
    <div class="dashboard-card payment-summary">
      <h2>Order Confirmation</h2>
      <div class="summary-box">
        <p>Package: <strong>500 Coins</strong></p>
        <p>Amount Due: <span class="price">฿400.00</span></p>
      </div>
      <div class="payment-methods">
        <button @click="pay" class="btn-pay pp">Pay with PromptPay</button>
        <button @click="pay" class="btn-pay">Pay with Credit Card</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

async function pay(amount = 400) {
  try {
    // Request a payment session from backend (prototype)
    const res = await fetch(`${BACKEND}/api/create-payment`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount }) });
    const j = await res.json();
    // In a real integration you'd redirect to the payment provider's URL.
    // For prototype we open the returned URL (which points to the frontend payment-success page)
    window.open(j.url, '_blank');
    alert('You will be redirected to the external payment provider. After payment, return to the site to see the result.');
  } catch (e) {
    alert('Failed to initiate payment.');
  }
}
</script>

<style scoped>
.summary-box { padding: 20px; background: var(--input-bg); border-radius: 12px; margin: 20px 0; font-size: 18px; }
.btn-pay { width: 100%; padding: 15px; margin-bottom: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; }
.btn-pay.pp { background: #00467f; color: white; }
</style>