<template>
  <div class="reader" v-if="currentComic && currentEpisode">
    <!-- Sticky Header -->
    <div class="reader-header-container">
      <div class="reader-header">
        <router-link :to="'/comic/' + currentComic.id" class="back-link">
          <span class="icon">❮</span> <span class="text">Back</span>
        </router-link>
        <div class="title-info">
          <h1>{{ currentComic.title }}</h1>
          <p>Episode {{ currentEpisode.number }}</p>
        </div>
      </div>
    </div>

    <!-- Top Controls -->
    <div class="controls-wrapper top">
      <div class="controls">
        <button class="nav-btn" @click="handlePrev" :disabled="currentIndex >= episodes.length - 1">◀ Prev</button>
        
        <div class="select-group">
          <select class="custom-select" :value="currentEpisode.id" @change="changeEpisode($event.target.value)">
            <option v-for="ep in episodes" :key="ep.id" :value="ep.id">Ep {{ ep.number }}</option>
          </select>
          
          <select class="custom-select" v-model="mode">
            <option value="scroll">Scroll</option>
            <option value="page">Page</option>
          </select>
        </div>

        <button class="nav-btn" @click="handleNext" :disabled="currentIndex <= 0 && mode === 'scroll'">Next ▶</button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content" :class="mode">
      <template v-if="mode === 'page' && totalPages > 0">
        <div class="page-container">
          <img :src="currentEpisode.images[currentPage - 1]" @click="handleNext" class="comic-img" loading="lazy" />
          <div class="page-indicator">{{ currentPage }} / {{ totalPages }}</div>
        </div>
      </template>

      <template v-else-if="mode === 'scroll' && currentEpisode.images">
        <div class="scroll-container">
          <img v-for="(img, index) in currentEpisode.images" :key="index" :src="img" class="comic-img" loading="lazy" />
        </div>
      </template>
    </div>

    <!-- Bottom Controls -->
    <div class="controls-wrapper bottom">
      <div class="controls">
        <button class="nav-btn" @click="handlePrev">◀ Previous</button>
        <button class="nav-btn primary" @click="handleNext">Next Episode ▶</button>
      </div>
    </div>

    <button class="scroll-top" @click="scrollToTop">↑</button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { comics } from "@/data/comics"
import { userStore } from "@/store/userStore"
import "@/assets/styles/reader.css"

const route = useRoute()
const router = useRouter()

const mode = ref("scroll")
const currentPage = ref(1)

const currentComic = computed(() => comics.find(c => String(c.id) === String(route.params.comic)))
const episodes = computed(() => currentComic.value?.episodes || [])
const currentEpisode = computed(() => episodes.value.find(e => String(e.id) === String(route.params.episode)) || episodes.value[0])
const totalPages = computed(() => currentEpisode.value?.images?.length || 0)
const currentIndex = computed(() => episodes.value.findIndex(e => e.id === currentEpisode.value?.id))

// ซิงค์ URL ลง State
watch(() => route.params, (newParams) => {
  currentPage.value = Number(newParams.page) || 1
  window.scrollTo(0, 0)
}, { immediate: true })

// อัปเดต URL ตามหน้าที่อ่านจริง
const updateUrl = () => {
  const basePath = `/reader/${currentComic.value.id}/${currentEpisode.value.id}`
  const finalPath = mode.value === "page" ? `${basePath}/${currentPage.value}` : basePath
  router.replace(finalPath)
}

// Logic การเปลี่ยนตอน (Smart Navigation)
const navigateToEpisode = async (targetEp, goLastPage = false) => {
  if (!targetEp) return
  const freeLimit = currentComic.value?.freeEpisodes || 0
  const isLocked = targetEp.number > freeLimit && !userStore.isUnlocked(currentComic.value.id, targetEp.id)
  
  if (!isLocked) {
    const targetPage = goLastPage ? targetEp.pages : 1
    router.push(`/reader/${currentComic.value.id}/${targetEp.id}/${targetPage}`)
  } else {
    if (confirm(`ตอนที่ ${targetEp.number} ติดเหรียญ ยืนยันปลดล็อกเพื่ออ่านต่อ?`)) {
      const success = await userStore.unlockEpisode(currentComic.value.id, targetEp.id, targetEp.price || 10)
      if (success) {
        const targetPage = goLastPage ? targetEp.pages : 1
        router.push(`/reader/${currentComic.value.id}/${targetEp.id}/${targetPage}`)
      } else if (confirm("เหรียญไม่พอ ไปเติมเหรียญไหม?")) {
        router.push("/coin")
      }
    }
  }
}

const handleNext = () => {
  if (mode.value === "page" && currentPage.value < totalPages.value) {
    currentPage.value++
    updateUrl()
  } else {
    const nextEp = episodes.value[currentIndex.value - 1]
    if (nextEp) navigateToEpisode(nextEp, false)
    else alert("คุณอ่านถึงตอนล่าสุดแล้ว!")
  }
}

const handlePrev = () => {
  if (mode.value === "page" && currentPage.value > 1) {
    currentPage.value--
    updateUrl()
  } else {
    const prevEp = episodes.value[currentIndex.value + 1]
    if (prevEp) navigateToEpisode(prevEp, true)
  }
}

const changeEpisode = (epId) => {
  const ep = episodes.value.find(e => String(e.id) === String(epId))
  navigateToEpisode(ep, false)
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

onMounted(() => {
  if (currentComic.value) {
    document.title = `${currentComic.value.title} - ตอนที่ ${currentEpisode.value.number}`
  }
})
</script>