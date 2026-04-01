// /src/store/mockUserStore.js
import { reactive } from 'vue';

// จำลองข้อมูลผู้ใช้ (สำหรับ Frontend เทสคนเดียว)
export const mockUserStore = reactive({
  coins: 50, // จำนวนเหรียญที่มี
  unlockedEpisodes: [
    // format: 'comicId_episodeId'
    'spy-x-family_ep1',
    'spy-x-family_ep2'
  ],
  
  // ตรวจสอบว่าตอนถูกปลดล็อกหรือยัง
  isUnlocked(comicId, episodeId) {
    return this.unlockedEpisodes.includes(`${comicId}_${episodeId}`);
  },
  
  // ปลดล็อกตอน
  unlockEpisode(comicId, episodeId, price) {
    if (this.coins >= price) {
      this.coins -= price;
      this.unlockedEpisodes.push(`${comicId}_${episodeId}`);
      alert(`Unlocked ${episodeId}. Remaining coins: ${this.coins}`);
      return true;
    } else {
      alert('Not enough coins! Please go to top-up.');
      return false;
    }
  }
});