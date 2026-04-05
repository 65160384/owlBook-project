<template>
  <div class="grid-container">
    <div
      v-for="comic in comics"
      :key="comic.id"
      class="comic-card"
    >
      <router-link :to="'/comic/' + comic.id">
        <div class="image-wrap">
          <img
            :src="comic.image"
            class="comic-image"
            :alt="comic.title"
          />
          <!-- optional top badge if first tag exists -->
          <div v-if="comic.tags && comic.tags.length" class="top-badge">{{ comic.tags[0] }}</div>
        </div>
        <div class="comic-info">
          <h3 class="card-title" :title="comic.title">{{ comic.title }}</h3>
          <div class="card-sub">{{ latestEpisodeText(comic) }}</div>
          <div class="card-rating">
            <div class="stars"> 
              <span v-for="n in 5" :key="n" class="star">{{ starChar(n, comic) }}</span>
            </div>
            <div class="rating-num">{{ comic.rating || '—' }}</div>
          </div>
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

const latestEpisodeText = (comic) => {
  const eps = comic.episodes || [];
  if (!eps.length) return '';
  // find highest number
  const latest = eps.reduce((a,b) => (a.number > b.number ? a : b));
  return `ตอนที่ ${latest.number}`;
}

const starChar = (n, comic) => {
  const r = parseFloat(comic.rating) || 0; // assume out of 10
  const outOf5 = Math.round((r / 10) * 5);
  return n <= outOf5 ? '★' : '☆';
}
</script>