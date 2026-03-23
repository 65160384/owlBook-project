<script setup>
import { useRoute } from "vue-router"

const route = useRoute()
const comicId = route.params.id

const episodes = ["ep1","ep2","ep3"]
</script>

<template>
  <div class="detail">
    <h1>{{ comicId }}</h1>

    <div class="episodes">
      <router-link 
        v-for="ep in episodes" 
        :key="ep"
        :to="`/reader/${comicId}/${ep}`"
        class="ep"
      >
        {{ ep }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.episodes{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.ep{
  padding:10px;
  background:#eee;
  border-radius:6px;
}
</style>