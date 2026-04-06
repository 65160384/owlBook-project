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
        <button class="nav-btn" @click="handlePrev" :disabled="currentIndex <= 0 && (mode === 'scroll' || currentPage <= 1)">◀ Prev</button>
        
        <div class="select-group">
          <!-- Page Selector -->
          <select v-if="mode === 'page' && totalPages > 0" class="custom-select" :value="currentPage" @change="handlePageSelect">
            <option v-for="page in totalPages" :key="page" :value="page">Page {{ page }}</option>
          </select>

          <!-- Episode Selector -->
          <select class="custom-select" :value="currentEpisode.id" @change="changeEpisode($event.target.value)">
            <option v-for="ep in episodes" :key="ep.id" :value="ep.id">Ep {{ ep.number }}</option>
          </select>
          
          <!-- Mode Selector -->
          <select class="custom-select" :value="mode" @change="handleModeSelect">
            <option value="scroll">Scroll</option>
            <option value="page">Page</option>
          </select>
        </div>

        <button class="nav-btn" @click="handleNext" :disabled="currentIndex >= episodes.length - 1 && (mode === 'scroll' || currentPage >= totalPages)">Next ▶</button>
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
  if (newParams.page) {
    mode.value = "page"
  } else {
    mode.value = "scroll"
  }
  window.scrollTo(0, 0)
}, { immediate: true })

// อัปเดต URL ตามหน้าที่อ่านจริง
const updateUrl = () => {
  const basePath = `/reader/${currentComic.value.id}/${currentEpisode.value.id}`
  const finalPath = mode.value === "page" ? `${basePath}/${currentPage.value}` : basePath
  router.replace(finalPath)
}

// อัตโนมัติเปลี่ยนเป็น Page Mode เมื่อเลือกหน้า
const handlePageSelect = (event) => {
  currentPage.value = Number(event.target.value)
  if (mode.value === 'scroll') {
    mode.value = 'page'
  }
  updateUrl()
}

// เมื่อเปลี่ยนโหมด
const handleModeSelect = (event) => {
  mode.value = event.target.value
  updateUrl()
}

// ตรวจสอบว่าตอนนั้นล็อคหรือไม่ (ใช้ตรรกะเดียวกับ ComicDetail)
const checkIsLocked = (ep) => {
  const freeLimit = currentComic.value?.freeEpisodes || 0;
  if (ep.number <= freeLimit) return false;

  const explicitlyLocked = ep.isLocked === true || (ep.price && ep.price > 0);
  if (!explicitlyLocked) return false;

  return !userStore.isUnlocked(currentComic.value.id, ep.id);
};

// นำทางไปยังตอนเป้าหมาย โดยคงโหมดการอ่านปัจจุบันไว้
const executeNavigation = (targetEp, goLastPage) => {
  let finalPath = `/reader/${currentComic.value.id}/${targetEp.id}`
  if (mode.value === 'page') {
    const targetPage = goLastPage ? targetEp.pages : 1
    finalPath += `/${targetPage}`
  }
  router.push(finalPath)
}

// Logic การเปลี่ยนตอน (Smart Navigation)
const navigateToEpisode = async (targetEp, goLastPage = false) => {
  if (!targetEp) return
  
  const isLocked = checkIsLocked(targetEp);
  
  if (!isLocked || ['admin', 'provider'].includes(userStore.role)) {
    executeNavigation(targetEp, goLastPage);
    return;
  }

  // ถ้าเป็น Guest เพิ่งจะเลื่อนมาเจอตอนล็อก
  if (!userStore.isLoggedIn) {
    if (confirm("ตอนนี้ต้องใช้เหรียญปลดล็อก กรุณาสมัครสมาชิกหรือเข้าสู่ระบบก่อนครับ")) {
      router.push('/login');
    }
    return;
  }

  const price = targetEp.price || 10;
  if (confirm(`ตอนที่ ${targetEp.number} ติดเหรียญ ยืนยันปลดล็อก (${price} Coins) เพื่ออ่านต่อ?`)) {
    const success = await userStore.unlockEpisode(currentComic.value.id, targetEp.id, price)
    if (success) {
      executeNavigation(targetEp, goLastPage);
    } else if (confirm("เหรียญไม่พอ ไปหน้าเติมเหรียญหรือไม่?")) {
      router.push("/coin")
    }
  }
}

const handleNext = () => {
  if (mode.value === "page" && currentPage.value < totalPages.value) {
    currentPage.value++
    updateUrl()
  } else {
    // เดินหน้าคือ index + 1
    const nextEp = episodes.value[currentIndex.value + 1]
    if (nextEp) navigateToEpisode(nextEp, false)
    else alert("คุณอ่านถึงตอนล่าสุดแล้ว!")
  }
}

const handlePrev = () => {
  if (mode.value === "page" && currentPage.value > 1) {
    currentPage.value--
    updateUrl()
  } else {
    // ถอยหลังคือ index - 1
    const prevEp = episodes.value[currentIndex.value - 1]
    if (prevEp) navigateToEpisode(prevEp, true)
    else alert("นี่คือตอนแรกแล้ว!")
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