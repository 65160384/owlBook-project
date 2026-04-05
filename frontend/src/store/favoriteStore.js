import { reactive, watch } from 'vue';

// โหลดข้อมูลจาก localStorage ถ้ามี
const saved = JSON.parse(localStorage.getItem('owlbook_favorites') || '[]');

export const favoriteStore = reactive({
  list: saved,
  
  isFavorite(comicId) {
    return this.list.includes(comicId);
  },

  toggle(comicId) {
    const index = this.list.indexOf(comicId);
    if (index > -1) {
      this.list.splice(index, 1);
    } else {
      this.list.push(comicId);
    }
  }
});

// บันทึกค่าลง localStorage ทุกครั้งที่เปลี่ยน
watch(() => favoriteStore.list, (newList) => {
  localStorage.setItem('owlbook_favorites', JSON.stringify([...newList]));
}, { deep: true });