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
          <div class="info-grid">
            <div class="info-item"><span class="info-label">Status:</span> <span>{{ comic.status || 'Ongoing' }}</span></div>
            <div class="info-item"><span class="info-label">Author:</span> <span>{{ comic.author || 'Unknown' }}</span></div>
            <div class="info-item"><span class="info-label">Year:</span> <span>{{ comic.year || '2026' }}</span></div>
            <div class="info-item"><span class="info-label">Views:</span> <span>{{ comic.views || '0' }}</span></div>
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
          placeholder="Search Chapter..." 
          class="chapter-search" 
          v-model="searchQuery" 
        />
        
        <div class="chapter-list">
          <div v-for="ep in filteredEpisodes" :key="ep.id">
            <a href="javascript:void(0)" @click="handleEpisodeAccess(ep)" class="chapter-item">
              <div class="chapter-info">
                <span class="chapter-name">ตอนที่ {{ ep.number }}</span>
                <span v-if="isLocked(ep)" class="lock-icon">🔒 ({{ ep.price }} Coins)</span>
              </div>
              <span class="chapter-date">{{ ep.date }}</span>
            </a>
          </div>
        </div>
      </section>

      <aside class="recommend-sidebar">
        <h3>Recommended</h3>
        <div class="recommend-list">
          <router-link 
            v-for="item in recommendationList" 
            :key="item.id" 
            :to="`/comic/${item.id}`"
            class="recommend-card"
          >
            <img :src="item.image" class="recommend-thumb-small" />
            <div class="recommend-info">
              <div class="recommend-title">{{ item.title }}</div>
              <div class="rating">⭐ {{ item.rating || '7.5' }}</div>
            </div>
          </router-link>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { comics } from "@/data/comics";
import { mockUserStore } from '@/store/mockUserStore';
import { favoriteStore } from '@/store/favoriteStore';
import "@/assets/styles/comic-detail.css";
  
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');

// ดึงข้อมูลมังงะ
const comic = computed(() => comics.find(c => c.id === route.params.id));

// ค้นหาตอน
const filteredEpisodes = computed(() => {
  if (!comic.value) return [];
  const eps = comic.value.episodes || [];
  if (!searchQuery.value) return eps;
  return eps.filter(ep => ep.number.toString().includes(searchQuery.value));
});

// แนะนำเรื่องอื่นๆ
const recommendationList = computed(() => {
  return comics.filter(c => c.id !== route.params.id).slice(0, 5);
});

// Logic ล็อกตอน
const isLocked = (ep) => {
  const freeLimit = comic.value.freeEpisodes || 0; 
  if (ep.number <= freeLimit) return false; 
  return !mockUserStore.isUnlocked(comic.value.id, ep.id);
};

// จัดการการกดเข้าตอน
const handleEpisodeAccess = (ep) => {
  if (!isLocked(ep)) {
    router.push(`/reader/${comic.value.id}/${ep.id}/1`);
  } else {
    if (confirm(`ตอนนี้ติดเหรียญ (${ep.price} Coins) ยืนยันปลดล็อก?`)) {
      if (mockUserStore.unlockEpisode(comic.value.id, ep.id, ep.price)) {
        router.push(`/reader/${comic.value.id}/${ep.id}/1`);
      } else if (confirm("เหรียญไม่พอ ไปหน้าเติมเหรียญไหม?")) {
        router.push('/coin');
      }
    }
  }
};

const toggleFavorite = () => {
  favoriteStore.toggle(comic.value.id);
};
</script>