<template>
  <div class="reader" v-if="currentComic && currentEpisode">
    <div class="reader-header-container">
      <div class="reader-header">
        <router-link :to="'/comic/' + currentComic.id" class="back-link">⬅ Back to Detail</router-link>
        <div class="title-info">
          <router-link :to="'/comic/' + currentComic.id">
            <h1>{{ currentComic.title }}</h1>
          </router-link>
          <p>ตอนที่ {{ currentEpisode.number }}</p>
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="btn nav-btn" @click="handlePrev">◀ Previous</button>

  <select class="custom-select form-input" :value="currentEpisode.id" @change="changeEpisode($event.target.value)">
        <option v-for="ep in episodes" :key="ep.id" :value="ep.id">
          ตอนที่ {{ ep.number }}
        </option>
      </select>

  <select class="custom-select form-input" v-model="mode">
        <option value="scroll">อ่านเต็มหน้า (Scroll)</option>
        <option value="page">อ่านทีละหน้า (Page)</option>
      </select>

  <select v-if="mode === 'page' && totalPages > 0" class="custom-select form-input" v-model="currentPage" @change="updateUrl">
        <option v-for="p in totalPages" :key="p" :value="p">Page {{ p }} / {{ totalPages }}</option>
      </select>

      <button class="btn nav-btn" @click="handleNext">Next ▶</button>
    </div>

  <div class="content">
  <div v-if="mode === 'page' && currentEpisode.images" class="page-container">
    <img 
      :src="currentEpisode.images[currentPage - 1]" 
      @click="handleNext" 
      class="comic-img" 
      style="width: 100%; max-width: 1000px; height: auto; display: block; margin: 0 auto;"
      loading="lazy"
    />
  </div>

  <div v-else-if="mode === 'scroll' && currentEpisode.images" class="scroll-container">
    <img 
      v-for="(img, index) in currentEpisode.images" 
      :key="index" 
      :src="img" 
      class="comic-img" 
      style="width: 100%; max-width: 1000px; height: auto; display: block; margin: 0 auto; margin-bottom: 10px;"
      loading="lazy"
    />
  </div>
</div>

    <div class="controls bottom">
      <button class="btn nav-btn" @click="handlePrev">◀ Previous</button>

  <select class="custom-select form-input" :value="currentEpisode.id" @change="changeEpisode($event.target.value)">
        <option v-for="ep in episodes" :key="ep.id" :value="ep.id">
          ตอนที่ {{ ep.number }}
        </option>
      </select>

  <select class="custom-select form-input" v-model="mode">
        <option value="scroll">อ่านเต็มหน้า (Scroll)</option>
        <option value="page">อ่านทีละหน้า (Page)</option>
      </select>

  <select v-if="mode === 'page' && totalPages > 0" class="custom-select form-input" v-model="currentPage" @change="updateUrl">
        <option v-for="p in totalPages" :key="p" :value="p">Page {{ p }} / {{ totalPages }}</option>
      </select>

      <button class="btn nav-btn" @click="handleNext">Next ▶</button>
    </div>

    <button class="scroll-top" @click="scrollToTop">Top ⬆</button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { comics } from "@/data/comics"
import { mockUserStore } from "@/store/mockUserStore"
import "@/assets/styles/reader.css"

const route = useRoute()
const router = useRouter()

const mode = ref("scroll")
const currentPage = ref(1)

const currentComic = computed(() => comics.find(c => c.id === route.params.comic))
const episodes = computed(() => currentComic.value?.episodes || [])
const currentEpisode = computed(() => episodes.value.find(e => e.id === route.params.episode) || episodes.value[0])
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
const navigateToEpisode = (targetEp, goLastPage = false) => {
  if (!targetEp) return
  const freeLimit = currentComic.value?.freeEpisodes || 0
  const isLocked = targetEp.number > freeLimit && !mockUserStore.isUnlocked(currentComic.value.id, targetEp.id)
  
  if (!isLocked) {
    const targetPage = goLastPage ? targetEp.pages : 1
    router.push(`/reader/${currentComic.value.id}/${targetEp.id}/${targetPage}`)
  } else {
    if (confirm(`ตอนที่ ${targetEp.number} ติดเหรียญ ยืนยันปลดล็อกเพื่ออ่านต่อ?`)) {
      if (mockUserStore.unlockEpisode(currentComic.value.id, targetEp.id, targetEp.price || 10)) {
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
  const ep = episodes.value.find(e => e.id === epId)
  navigateToEpisode(ep, false)
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

onMounted(() => {
  if (currentComic.value) {
    document.title = `${currentComic.value.title} - ตอนที่ ${currentEpisode.value.number}`
  }
})
</script>