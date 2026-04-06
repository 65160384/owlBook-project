<template>
  <div class="detail-page" v-if="comic">
    <header class="comic-header">
      <div class="header-content">
        <div class="cover-container">
          <img :src="comic.image" class="cover-image" />
          
          <button 
            @click="toggleFavorite" 
            :class="['bookmark-btn', { 'is-fav': favoriteStore.isFavorite(comic.id) }]"
          >
            {{ favoriteStore.isFavorite(comic.id) ? '❤️ In My List' : '🔖 Add to My List' }}
          </button>
        </div>
        
        <div class="info-container">
          <h1>{{ comic.title }}</h1>
          <p v-if="comic.description" class="comic-description">{{ comic.description }}</p>
          <div class="info-grid">
            <div class="info-item"><span class="info-label">Author:</span> <span>{{ comic.author || 'Unknown' }}</span></div>
            <div class="info-item"><span class="info-label">Views:</span> <span>{{ comic.views || '0' }}</span></div>
            <div class="info-item"><span class="info-label">Ref:</span> <span>{{ comic.ref || 'OwlBook' }}</span></div>
          </div>
          <div class="tag-list">
            <span v-for="tag in comic.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="main-layout">
      <section class="chapter-section">
        <h3>Chapters of {{ comic.title }}</h3>
        <input 
          type="text" 
          placeholder="Search Chapter... (example: 1 or 3)" 
          class="chapter-search" 
          v-model="searchQuery" 
        />
        
        <div class="chapter-list">
          <div v-for="ep in filteredEpisodes" :key="ep.id">
            <a href="javascript:void(0)" @click="handleEpisodeAccess(ep)" :class="['chapter-item', { locked: isLocked(ep) }]">
              <div class="chapter-info">
                <span class="chapter-name">ตอนที่ {{ ep.number }}</span>
                <template v-if="isLocked(ep)">
                  <span class="lock-icon">🔒</span>
                  <span class="lock-price">{{ ep.price ? (`${ep.price} Coins`) : 'Locked' }}</span>
                </template>
              </div>
              <span class="chapter-date">{{ ep.date }}</span>
            </a>
          </div>
        </div>
      </section>

      <aside class="recommend-sidebar">
        <PopularList :comics="comics" :limit="6" />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { comics } from "@/data/comics";
import { userStore } from '@/store/userStore';
import { favoriteStore } from '@/store/favoriteStore';
import "@/assets/styles/comic-detail.css";
import PopularList from '@/components/PopularList.vue';
  
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');

// ดึงข้อมูลมังงะ
const comic = computed(() => comics.find(c => String(c.id) === String(route.params.id)));

// ค้นหาตอน
const filteredEpisodes = computed(() => {
  if (!comic.value) return [];
  const eps = comic.value.episodes || [];
  if (!searchQuery.value) return eps;
  return eps.filter(ep => ep.number.toString().includes(searchQuery.value));
});

// Logic ล็อกตอน
const isLocked = (ep) => {
  const freeLimit = comic.value.freeEpisodes || 0; 
  if (ep.number <= freeLimit) return false;

  const explicitlyLocked = ep.isLocked === true || (ep.price && ep.price > 0);
  if (!explicitlyLocked) return false;

  return !userStore.isUnlocked(comic.value.id, ep.id);
};

// จัดการการเข้าถึงตอนอ่าน
const handleEpisodeAccess = async (ep) => {
  // 1. ถ้าตอนไม่ได้ล็อค หรือมีสิทธิ์เข้าถึงพิเศษ (Admin/Provider) ให้เข้าอ่านได้เลย
  // (isLocked จัดการตรวจสอบทั้งตอนฟรีปกติตาม freeEpisodes และตอนที่ price = 0 แล้ว)
  if (!isLocked(ep) || ['admin', 'provider'].includes(userStore.role)) {
    router.push(`/reader/${comic.value.id}/${ep.id}`);
    return;
  }

  // 2. ถ้าถึงตรงนี้แปลว่าตอน "ถูกล็อค" และต้องจ่าย Coins
  // ถ้าเป็น Guest (ยังไม่ได้ Login)
  if (!userStore.isLoggedIn) {
    if (confirm("ตอนนี้ต้องใช้เหรียญปลดล็อก กรุณาสมัครสมาชิกหรือเข้าสู่ระบบก่อนครับ")) {
      router.push('/login');
    }
    return;
  }

  // 3. เช็คว่าเคยซื้อหรือยัง
  if (userStore.isUnlocked(comic.value.id, ep.id)) {
    router.push(`/reader/${comic.value.id}/${ep.id}/1`);
    return;
  }

  // 4. ยืนยันปลดล็อก (สำหรับ Member)
  if (confirm(`ปลดล็อกตอนที่ ${ep.number} ใช้ ${ep.price || 10} Coins?`)) {
    const success = await userStore.unlockEpisode(comic.value.id, ep.id, ep.price || 10);
    if (success) {
      router.push(`/reader/${comic.value.id}/${ep.id}/1`);
    } else {
      if (confirm("เหรียญไม่พอ ต้องการไปหน้าเติมเหรียญหรือไม่?")) {
        router.push('/coin');
      }
    }
  }
};

// --- Logic ปรับปรุงใหม่: กรองสิทธิ์การ Add to List ---
const toggleFavorite = () => {
  // 1. ถ้ายังไม่ได้ Login (Guest)
  if (!userStore.isLoggedIn) {
    alert("เฉพาะสมาชิกเท่านั้นที่สามารถบันทึกรายการโปรดได้ กรุณาสมัครสมาชิกหรือเข้าสู่ระบบก่อนนะคะ");
    router.push('/login');
    return;
  }

  // 2. ถ้า Login แล้วแต่เป็น Admin หรือ Provider
  if (['admin', 'provider'].includes(userStore.role)) {
    alert("บัญชีประเภท Admin และ Content Provider ไม่สามารถใช้ฟีเจอร์บันทึกรายการโปรดได้ค่ะ");
    return;
  }
  
  // 3. ถ้าเป็น Member ปกติ ให้ทำงานได้
  favoriteStore.toggle(comic.value.id);
};
</script>