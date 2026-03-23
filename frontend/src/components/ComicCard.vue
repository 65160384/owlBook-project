<script setup>
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

<style scoped>
.card {
  width: 180px;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.title {
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
  color: blue;
  word-break: break-word;
}
</style>