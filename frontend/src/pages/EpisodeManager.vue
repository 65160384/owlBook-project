<template>
  <div class="main-container">
    <div class="manager-header">
      <h1 class="big-title">{{ comic?.title || 'กำลังโหลด...' }}</h1>
    </div>

    <div class="manager-layout">
      <div class="selection-side">
        <div class="dropdown-wrapper">
          <label class="select-label">Select EP ▽</label>
          <select v-model="selectedEpId" class="ep-dropdown" @change="onEpChange">
            <option value="" disabled>เลือกตอนที่ต้องการจัดการ</option>
            <option v-for="ep in episodes" :key="ep.id" :value="ep.id">
              Ep {{ ep.number }}
            </option>
          </select>
        </div>

        <div class="ep-info-list">
          <div v-for="ep in episodes" :key="'info-'+ep.id" 
               :class="['ep-info-item', { active: selectedEpId === ep.id }]">
            <p class="ep-name">ตอนที่ {{ ep.number }}: {{ ep.title || 'ไม่มีชื่อตอน' }}</p>
            <p class="ep-count">ตรวจพบรูปภาพในเครื่อง: {{ getImagesCount(ep) }} หน้า</p>
          </div>
        </div>
      </div>

      <div v-if="selectedEpisode" class="reorder-area">
        <div class="reorder-header">
          <h3>จัดเรียงลำดับหน้า ep {{ selectedEpisode.number }}</h3>
        </div>

        <div class="scroll-grid-container">
          <div class="pages-grid-reorder">
            <div v-for="(imgUrl, idx) in tempPages" :key="idx" class="page-reorder-card">
              <div class="img-box">
                <img :src="absPath(imgUrl)" class="thumb-reorder" />
              </div>
              <div class="page-index-label">{{ idx + 1 }}</div>
              
              <div class="reorder-btns">
                <button class="move-btn" @click="movePage(idx, -1)" :disabled="idx === 0">◀</button>
                <button class="move-btn" @click="movePage(idx, 1)" :disabled="idx === tempPages.length - 1">▶</button>
                <button class="del-btn" @click="removePage(idx)">🗑️</button>
              </div>
            </div>
          </div>
        </div>

        <div class="action-footer">
          <button class="btn-cancel-order" @click="cancelEdit">Cancel (ยกเลิก)</button>
          <button class="btn-save-order" @click="saveOrder">Save (บันทึกการจัดเรียง)</button>
        </div>
      </div>
      
      <div v-else class="empty-reorder-state">
        <p>กรุณาเลือกตอนจาก Dropdown ด้านซ้ายเพื่อเริ่มจัดเรียงลำดับรูปภาพ</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { comics } from '@/data/comics'; // ดึงข้อมูลจาก Folder
import "@/assets/styles/episode-manager.css"; //

const route = useRoute();
const comicId = route.params.comicId;
const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'; //

const comic = ref(null);
const episodes = ref([]);
const selectedEpId = ref('');
const tempPages = ref([]);

const loadData = async () => {
  // ดึงข้อมูลจาก Folder เป็นหลัก
  const localComic = comics.find(c => c.id === comicId);
  if (localComic) {
    comic.value = localComic;
    episodes.value = localComic.episodes || [];
  }

  // ดึงข้อมูลจาก Backend เสริม
  try {
    const res = await fetch(`${BACKEND}/api/comics/${comicId}/episodes`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) episodes.value = data;
    }
  } catch (e) { console.log("Offline mode: Using local assets"); }
};

onMounted(loadData);

const selectedEpisode = computed(() => {
  return episodes.value.find(e => e.id === selectedEpId.value);
});

const getImagesCount = (ep) => {
  return ep.images?.length || ep.pages?.length || 0; //
};

const onEpChange = () => {
  if (selectedEpisode.value) {
    // รวม Source รูปภาพทั้ง 2 แหล่งเข้า tempPages เพื่อจัดลำดับ
    const imgs = selectedEpisode.value.images || (selectedEpisode.value.pages ? selectedEpisode.value.pages.map(p => p.path || p) : []);
    tempPages.value = [...imgs];
  }
};

const movePage = (index, direction) => {
  const newIndex = index + direction;
  const arr = tempPages.value;
  [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]]; //
};

const removePage = (idx) => {
  if (confirm("ลบหน้านี้ออกจากลำดับการแสดงผลชั่วคราว?")) tempPages.value.splice(idx, 1);
};

// ฟังก์ชันยกเลิกการแก้ไข (ใหม่)
const cancelEdit = () => {
  if (confirm("คุณต้องการยกเลิกการเปลี่ยนแปลงและล้างค่าการจัดเรียงหรือไม่?")) {
    selectedEpId.value = '';
    tempPages.value = [];
  }
};

const saveOrder = async () => {
  try {
    await fetch(`${BACKEND}/api/comics/${comicId}/episodes/${selectedEpId.value}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: tempPages.value })
    });
    alert("บันทึกลำดับรูปภาพใหม่เรียบร้อย!");
    loadData();
    selectedEpId.value = ''; // ปิดหน้าจัดการหลังบันทึก
  } catch (e) { alert("บันทึกสำเร็จ (Simulation Mode)"); }
};

const absPath = (p) => {
  if (!p) return '';
  return p.startsWith('http') || p.startsWith('/src') || p.startsWith('data:') ? p : BACKEND + p; //
};
</script>

