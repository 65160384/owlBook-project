<script setup>
import { useRoute, useRouter } from "vue-router"
import { ref, watch, onMounted, computed } from "vue"
import "@/assets/styles/reader.css"
import { comics } from "@/data/comics"

const route = useRoute()
const router = useRouter()

const comic = ref(route.params.comic)
const episode = ref(route.params.episode || "ep1")
const currentPage = ref(Number(route.params.page) || 1)

const mode = ref("scroll")
const images = ref([])
const totalPages = ref(0)
const episodes = ref([]) // เก็บ folder ep จริง ๆ

const pad = (n) => String(n).padStart(2, "0")

// หา comic ปัจจุบัน
const currentComic = computed(() =>
  comics.find(c => c.id === comic.value)
)

// โหลด episodes จาก index.json
const loadEpisodes = async () => {
  try {
    const res = await fetch(`/comics/${comic.value}/index.json`)
    const data = await res.json()
    episodes.value = data.episodes.map(e => e.folder)
    if (!episodes.value.includes(episode.value)) {
      episode.value = episodes.value[0] || "ep1"
    }
  } catch (err) {
    console.warn("ไม่พบ index.json fallback เป็น ep1-ep50")
    episodes.value = Array.from({ length: 50 }, (_, i) => `ep${i + 1}`)
    if (!episodes.value.includes(episode.value)) {
      episode.value = episodes.value[0]
    }
  }
}

// โหลดรูป dynamic ของ ep
const loadImages = async () => {
  images.value = []
  totalPages.value = 0

  let i = 1
  while (true) {
    const page = pad(i)
    const urlJpg = `/comics/${comic.value}/${episode.value}/${page}.jpg`
    const urlPng = `/comics/${comic.value}/${episode.value}/${page}.png`

    const existsJpg = await checkImage(urlJpg)
    const existsPng = await checkImage(urlPng)

    if (!existsJpg && !existsPng) break
    images.value.push(existsJpg ? urlJpg : urlPng)
    i++
  }

  totalPages.value = images.value.length
}

// เช็คภาพ
const checkImage = (url) =>
  new Promise((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })

// โหลด episode + images + sync URL page
const reloadAll = async () => {
  await loadEpisodes()
  // default page = 01 ถ้า route ไม่มี page
  if (!route.params.page) {
    currentPage.value = 1
    router.replace(`/reader/${comic.value}/${episode.value}/${pad(currentPage.value)}`)
  } else {
    currentPage.value = Number(route.params.page)
  }
  await loadImages()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted(reloadAll)

watch(() => route.params, async () => {
  comic.value = route.params.comic
  episode.value = route.params.episode || episodes.value[0] || "ep1"
  currentPage.value = Number(route.params.page) || 1
  await reloadAll()
})

// next/prev episode
const getEpIndex = () => episodes.value.indexOf(episode.value)

const goNextEpisode = async () => {
  const idx = getEpIndex()
  if (idx >= 0 && idx < episodes.value.length - 1) {
    await router.push(`/reader/${comic.value}/${episodes.value[idx + 1]}/01`)
    currentPage.value = 1
  }
}

const goPrevEpisode = async () => {
  const idx = getEpIndex()
  if (idx > 0) {
    await router.push(`/reader/${comic.value}/${episodes.value[idx - 1]}/01`)
    currentPage.value = 1
  }
}

// ปุ่มรวม next/prev page+ep
const handleNext = () => {
  if (mode.value === "page") {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      router.replace(`/reader/${comic.value}/${episode.value}/${pad(currentPage.value)}`)
    } else {
      goNextEpisode()
    }
  } else {
    goNextEpisode()
  }
}

const handlePrev = async () => {
  if (mode.value === "page") {
    if (currentPage.value > 1) {
      currentPage.value--
      router.replace(`/reader/${comic.value}/${episode.value}/${pad(currentPage.value)}`)
    } else {
      await goPrevEpisode()
      setTimeout(() => {
        currentPage.value = totalPages.value
        router.replace(`/reader/${comic.value}/${episode.value}/${pad(currentPage.value)}`)
      }, 300)
    }
  } else {
    goPrevEpisode()
  }
}

// episode dropdown
const changeEpisode = (ep) => router.push(`/reader/${comic.value}/${ep}/01`)

// page dropdown
const pageList = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))
const changePage = (p) => {
  currentPage.value = Number(p)
  router.replace(`/reader/${comic.value}/${episode.value}/${pad(currentPage.value)}`)
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// scroll top
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
</script>

<template>
  <div class="reader">

    <div class="title">
      <h1>{{ currentComic?.title || comic }}</h1>
      <p>{{ episode }}</p>
    </div>

    <div class="controls">
      <button class="btn" @click="handlePrev">◀</button>

      <select :value="episode" @change="changeEpisode($event.target.value)">
        <option v-for="ep in episodes" :key="ep" :value="ep">{{ ep }}</option>
      </select>

      <select v-model="mode">
        <option value="scroll">Scroll</option>
        <option value="page">Page</option>
      </select>

      <select v-if="mode === 'page'" :value="currentPage" @change="changePage($event.target.value)">
        <option v-for="p in pageList" :key="p" :value="p">Page {{ p }}</option>
      </select>

      <button class="btn" @click="handleNext">▶</button>
    </div>

    <div class="content">
      <div v-if="mode === 'page'" class="page">
        <img :src="images[currentPage - 1]" />
      </div>
      <div v-else class="scroll">
        <img v-for="img in images" :key="img" :src="img" />
      </div>
    </div>

    <div class="controls bottom">
      <button class="btn" @click="handlePrev">◀</button>

      <select :value="episode" @change="changeEpisode($event.target.value)">
        <option v-for="ep in episodes" :key="ep" :value="ep">{{ ep }}</option>
      </select>

      <select v-model="mode">
        <option value="scroll">Scroll</option>
        <option value="page">Page</option>
      </select>

      <select v-if="mode === 'page'" :value="currentPage" @change="changePage($event.target.value)">
        <option v-for="p in pageList" :key="p" :value="p">Page {{ p }}</option>
      </select>

      <span v-if="mode === 'page'" class="page-info">
        {{ currentPage }} / {{ totalPages }}
      </span>

      <button class="btn" @click="handleNext">▶</button>
    </div>

    <button class="scroll-top" @click="scrollToTop">⬆</button>
  </div>
</template>