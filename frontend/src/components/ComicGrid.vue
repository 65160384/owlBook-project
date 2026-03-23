<template>
  <div class="grid-container">
    <div
      v-for="comic in comics"
      :key="comic.id"
      class="comic-card"
    >
      <router-link :to="'/comic/' + comic.id">
        <img
          :src="comic.image"
          class="comic-image"
          :alt="comic.title"
        />
        <div class="comic-info">
          <h3>{{ comic.title }}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comics: Array
});
import "@/assets/styles/comicgrid.css"
</script>