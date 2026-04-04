import { reactive } from 'vue';

const initialState = {
  isLoggedIn: false,
  role: 'guest', // guest, member, provider, admin
  coins: 0,
  unlockedEpisodes: [], // เก็บรายการที่ซื้อแล้วตาม Activity Diagram
  userId: null
};

export const mockUserStore = reactive({
  ...initialState,

  login(role) {
    this.isLoggedIn = true;
    this.role = role;
    this.userId = 'user_' + Date.now();
    // จำลองเหรียญเริ่มต้นสำหรับ Member ตาม User Story
    this.coins = (role === 'member') ? 100 : 0; 
  },

  logout() {
    Object.assign(this, initialState);
  },

  // UC-10: เติมเหรียญ (จำลองการรับค่าจาก Payment System)
  addCoins(amount) {
    this.coins += Number(amount);
  },

  // UC-08 & UC-11: ตรวจสอบและปลดล็อกเนื้อหา
  isUnlocked(comicId, episodeId) {
    return this.unlockedEpisodes.includes(`${comicId}_${episodeId}`);
  },
  
  unlockEpisode(comicId, episodeId, price) {
    // ตรวจสอบเงื่อนไขตาม Activity Diagram: "เหรียญในบัญชีเพียงพอหรือไม่"
    if (this.coins >= price) {
      this.coins -= price;
      this.unlockedEpisodes.push(`${comicId}_${episodeId}`);
      return true;
    }
    return false; // ถ้าไม่พอ ระบบจะพาไปหน้าเติมเงินตาม Diagram
  }
});