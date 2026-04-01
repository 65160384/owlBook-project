<template>
  <div class="main-container">
    <h2 class="page-title">📚 My List</h2>
    
    <div v-if="myList.length > 0">
      <ComicGrid :comics="myList" />
    </div>
    
    <div v-else class="empty-state">
      <p>Your list is empty. Go add some comics!</p>
      <router-link to="/" class="btn-home">Browse Comics</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { comics } from "@/data/comics";
import { favoriteStore } from '@/store/favoriteStore';
import ComicGrid from "@/components/ComicGrid.vue";

const myList = computed(() => {
  // กรองมังงะที่มี ID อยู่ใน favoriteStore
  return comics.filter(c => favoriteStore.isFavorite(c.id));
});
</script>

<style scoped>
.page-title { margin: 30px 0; text-align: left; }
.empty-state { padding: 100px 20px; text-align: center; color: #64748b; }
.btn-home { 
  display: inline-block; 
  margin-top: 20px; 
  padding: 10px 20px; 
  background: #ff9900; 
  color: white; 
  border-radius: 8px; 
}
</style>