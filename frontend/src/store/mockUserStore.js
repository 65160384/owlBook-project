import { reactive } from 'vue';

const initialState = {
  isLoggedIn: false,
  role: 'guest', // guest, member, provider, admin
  coins: 0,
  unlockedEpisodes: [], // เก็บรายการที่ซื้อแล้วตาม Activity Diagram
  userId: null
};

// Decode JWT payload without a library
function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

// Restore session from localStorage if a valid token exists
function getRestoredState() {
  const token = localStorage.getItem('token');
  if (!token) return { ...initialState };

  const payload = decodeToken(token);
  if (!payload) return { ...initialState };

  // Check if token is expired
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return { ...initialState };
  }

  return {
    isLoggedIn: true,
    role: payload.role || 'guest',
    coins: Number(localStorage.getItem('coins') || 0),
    unlockedEpisodes: JSON.parse(localStorage.getItem('unlockedEpisodes') || '[]'),
    userId: payload.id || null,
    token
  };
}

export const mockUserStore = reactive({
  ...getRestoredState(),

  login(token, role, coins) {
    this.isLoggedIn = true;
    this.role = role || 'guest';
    this.coins = coins || 0;
    
    if (token) {
      this.token = token;
      localStorage.setItem('token', token);
    }
    localStorage.setItem('coins', this.coins);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('coins');
    localStorage.removeItem('unlockedEpisodes');
    Object.assign(this, initialState);
  },

  // UC-10: เติมเหรียญ (จำลองการรับค่าจาก Payment System)
  addCoins(amount) {
    this.coins += Number(amount);
    localStorage.setItem('coins', this.coins);
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
      localStorage.setItem('coins', this.coins);
      localStorage.setItem('unlockedEpisodes', JSON.stringify(this.unlockedEpisodes));
      return true;
    }
    return false; // ถ้าไม่พอ ระบบจะพาไปหน้าเติมเงินตาม Diagram
  }
});