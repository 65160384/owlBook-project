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
import "@/assets/styles/navbar.css"


const myList = computed(() => {
  // กรองมังงะที่มี ID อยู่ใน favoriteStore
  return comics.filter(c => favoriteStore.isFavorite(c.id));
});
</script>
