<script setup>
import { onMounted, ref, computed } from 'vue';
import ComicGrid from "../components/ComicGrid.vue";
import "@/assets/styles/home.css"
import { comics } from "@/data/comics"

const searchQuery = ref('');
const selectedCategory = ref('All');

onMounted(() => {
  document.title = "OwlBook - อ่านมังงะออนไลน์"; // เปลี่ยนชื่อแท็บ Browser
});

// derive category list from tags (dedupe by normalized value but keep original display text)
const categories = computed(() => {
  const map = new Map();
  (comics || []).forEach(c => {
    (c.tags || []).forEach(t => {
      if (!t) return;
      const key = t.toString().trim().toLowerCase();
      if (!map.has(key)) map.set(key, t.toString().trim());
    });
  });
  const list = Array.from(map.values()).sort((a,b) => a.localeCompare(b, undefined, {sensitivity:'base'}));
  return ['All', ...list];
});

const filteredComics = computed(() => {
  const q = searchQuery.value && searchQuery.value.toLowerCase();
  return comics.filter(c => {
    // --- เงื่อนไขเพิ่มเติม: ถ้าถูกซ่อน (hidden: true) จะไม่นำมาแสดง ---
    if (c.hidden) return false;
    
    if (selectedCategory.value !== 'All') {
      if (!c.tags || !c.tags.includes(selectedCategory.value)) return false;
    }
    if (!q) return true;
    return (c.title || '').toLowerCase().includes(q) || (c.author || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q);
  });
});
</script>

<template>
  <div class="home">
    <section class="hero-banner">
      <div class="hero-content">
        <h1>ยินดีต้อนรับสู่ OwlBook</h1>
        <p>แหล่งรวมมังงะออนไลน์ อ่านฟรี อัปเดตใหม่ทุกวัน</p>
      </div>
    </section>

    <div class="discover-bar">
      <input v-model="searchQuery" class="discover-search form-input" placeholder="ค้นหาชื่อเรื่อง/ผู้แต่ง/คำอธิบาย..." />
      <select v-model="selectedCategory" class="discover-filter form-input">
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="home-content">
      <div class="main-col">
        <h2>Popular Comics</h2>
        <ComicGrid :comics="filteredComics" />
      </div>
    </div>
  </div>
</template>