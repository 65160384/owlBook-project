<script setup>
import "@/assets/styles/comic-card.css"
defineProps({
  comic: Object
})
</script>

<template>
  <router-link :to="'/comic/' + comic.id">
    <div class="card">
      <img :src="comic.cover || comic.image" alt="comic cover" />
      <p class="title">{{ comic.title }}</p>
    </div>
  </router-link>
</template>
