<template>
  <div class="reader" v-if="currentComic && currentEpisode">
    <div class="title">
      <h1>{{ currentComic.title }}</h1>
      <p>ตอนที่ {{ currentEpisode.number }}</p>
    </div>

    <div class="controls">
      <button class="btn" @click="handlePrev">◀ Previous</button>

      <select :value="currentEpisode.id" @change="changeEpisode($event.target.value)">
        <option v-for="ep in episodes" :key="ep.id" :value="ep.id">
          ตอนที่ {{ ep.number }}
        </option>
      </select>

      <select v-model="mode">
        <option value="scroll">Scroll</option>
        <option value="page">Page</option>
      </select>

      <select v-if="mode === 'page' && totalPages > 0" v-model="currentPage" @change="scrollToTop">
        <option v-for="p in totalPages" :key="p" :value="p">Page {{ p }}</option>
      </select>

      <button class="btn" @click="handleNext">Next ▶</button>
    </div>

    <div class="content">
      <div v-if="mode === 'page' && currentEpisode.images" class="page">
        <img :src="currentEpisode.images[currentPage - 1]" @click="handleNext" />
      </div>

      <div v-else-if="mode === 'scroll' && currentEpisode.images" class="scroll">
        <img v-for="(img, index) in currentEpisode.images" :key="index" :src="img" />
      </div>
    </div>

    <div class="controls bottom">
      <button class="btn" @click="handlePrev">◀ Previous</button>

      <select :value="currentEpisode.id" @change="changeEpisode($event.target.value)">
        <option v-for="ep in episodes" :key="ep.id" :value="ep.id">
          ตอนที่ {{ ep.number }}
        </option>
      </select>

      <select v-model="mode">
        <option value="scroll">Scroll</option>
        <option value="page">Page</option>
      </select>

      <select v-if="mode === 'page' && totalPages > 0" v-model="currentPage" @change="scrollToTop">
        <option v-for="p in totalPages" :key="p" :value="p">Page {{ p }}</option>
      </select>

      <button class="btn" @click="handleNext">Next ▶</button>
    </div>

    <button class="scroll-top" @click="scrollToTop">Top ⬆</button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { comics } from "@/data/comics"
import { mockUserStore } from '@/store/mockUserStore'
import "@/assets/styles/reader.css"

const route = useRoute()
const router = useRouter()

const mode = ref("scroll")
const currentPage = ref(Number(route.params.page) || 1)

const currentComic = computed(() => comics.find(c => c.id === route.params.comic))
const episodes = computed(() => currentComic.value?.episodes || [])
const currentEpisode = computed(() => episodes.value.find(e => e.id === route.params.episode) || episodes.value[0])
const totalPages = computed(() => currentEpisode.value?.images?.length || 0)
const currentIndex = computed(() => episodes.value.findIndex(e => e.id === currentEpisode.value?.id))

// --- แก้ไข Logic การเปลี่ยนตอน ---
const navigateToEpisode = (targetEp, startAtLast = false) => {
  if (!targetEp) return
  if (!isLocked(targetEp)) {
    // ถ้า startAtLast เป็น true ให้ไปที่หน้าสุดท้ายของตอนนั้นๆ
    const targetPage = startAtLast ? targetEp.pages : 1
    router.push(`/reader/${currentComic.value.id}/${targetEp.id}/${targetPage}`)
  } else {
    if (confirm(`ตอนที่ ${targetEp.number} ติดเหรียญ ยืนยันปลดล็อก?`)) {
      if (mockUserStore.unlockEpisode(currentComic.value.id, targetEp.id, targetEp.price || 10)) {
        const targetPage = startAtLast ? targetEp.pages : 1
        router.push(`/reader/${currentComic.value.id}/${targetEp.id}/${targetPage}`)
      } else if (confirm("เหรียญไม่พอ ไปเติมเหรียญไหม?")) {
        router.push('/coin')
      }
    }
  }
}

const handleNext = () => {
  if (mode.value === "page" && currentPage.value < totalPages.value) {
    currentPage.value++
  } else {
    const nextEp = episodes.value[currentIndex.value - 1] 
    if (nextEp) navigateToEpisode(nextEp)
    else alert("คุณอ่านถึงตอนล่าสุดแล้ว!")
  }
}

const handlePrev = () => {
  if (mode.value === "page" && currentPage.value > 1) {
    currentPage.value--
  } else {
    // ไปตอนก่อนหน้า (index มากขึ้น) และสั่งให้ไปที่ "หน้าสุดท้าย"
    const prevEp = episodes.value[currentIndex.value + 1]
    if (prevEp) navigateToEpisode(prevEp, true)
  }
}

// --- ใหม่: Watcher อัปเดต Path เปลี่ยนตามหน้าจริง ---
watch([currentPage, () => route.params.episode], () => {
  // อัปเดต URL โดยไม่ทำให้หน้ากระตุก (ใช้ replace)
  router.replace(`/reader/${currentComic.value.id}/${currentEpisode.value.id}/${currentPage.value}`)
  if (mode.value === "page") scrollToTop()
})

const changeEpisode = (epId) => {
  const ep = episodes.value.find(e => e.id === epId)
  navigateToEpisode(ep)
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

onMounted(() => {
  if (route.params.page) currentPage.value = parseInt(route.params.page)
})

const isLocked = (ep) => {
  const freeLimit = currentComic.value?.freeEpisodes || 0
  return ep.number > freeLimit && !mockUserStore.isUnlocked(currentComic.value.id, ep.id)
}
const getImageUrl = (p) => currentEpisode.value.images[p - 1]
</script>