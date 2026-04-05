import { reactive } from 'vue';
import { favoriteStore } from './favoriteStore';
import { fetchUserComics, managedComics } from '../data/comics';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

// Decode JWT payload
function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

const initialState = {
  isLoggedIn: false,
  role: 'guest',
  coins: 0,
  unlockedEpisodes: [],
  userId: null,
  token: null
};

// Restore session from localStorage on startup
function getRestoredState() {
  const token = localStorage.getItem('token');
  if (!token) return { ...initialState };

  const payload = decodeToken(token);
  if (!payload) return { ...initialState };

  // Check expiry
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return { ...initialState };
  }

  return {
    isLoggedIn: true,
    role: payload.role || 'guest',
    coins: 0, // will be fetched from backend
    unlockedEpisodes: [], // will be fetched from backend
    userId: payload.id || null,
    token
  };
}

export const userStore = reactive({
  ...getRestoredState(),

  // Fetch real user profile from backend (coins, etc.)
  async fetchProfile() {
    if (!this.token) return;
    try {
      const res = await fetch(`${BACKEND}/api/auth/profile`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      this.coins = data.coins ?? 0;
      this.role = data.role || this.role;
      this.userId = data.userId || this.userId;
      this.unlockedEpisodes = data.unlockedEpisodes || [];
      if (data.favorites) {
        favoriteStore.setFavorites(data.favorites);
      }
    } catch (e) {
      console.warn('Failed to fetch user profile', e);
    }
  },

  async login(token, role, coins) {
    this.isLoggedIn = true;
    this.role = role || 'guest';
    this.coins = coins || 0;
    this.token = token;
    localStorage.setItem('token', token);

    // Decode userId from token
    const payload = decodeToken(token);
    if (payload) this.userId = payload.id;

    // Fetch latest coin balance from backend
    await this.fetchProfile();
    await fetchUserComics();
    if (['admin', 'provider'].includes(this.role)) {
      await fetchUserComics(true);
    }
  },

  logout() {
    localStorage.removeItem('token');
    favoriteStore.clear();
    Object.assign(this, { ...initialState });
    fetchUserComics();
    managedComics.splice(0, managedComics.length);
  },

  // Add coins (calls backend to persist)
  async addCoins(amount) {
    this.coins += Number(amount);
    // Persist to backend
    if (this.token) {
      try {
        await fetch(`${BACKEND}/api/auth/update-coins`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify({ coins: this.coins })
        });
      } catch (e) {
        console.warn('Failed to update coins on server', e);
      }
    }
  },

  isUnlocked(comicId, episodeId) {
    return this.unlockedEpisodes.includes(`${comicId}_${episodeId}`);
  },

  async unlockEpisode(comicId, episodeId, price) {
    if (this.coins < price) return false;

    // Persist to backend
    if (this.token) {
      try {
        const res = await fetch(`${BACKEND}/api/auth/unlock-episode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify({ 
            cartoon_ep_id: episodeId, 
            price: price 
          })
        });

        if (res.ok) {
          const data = await res.json();
          this.coins = data.coins;
          this.unlockedEpisodes.push(`${comicId}_${episodeId}`);
          return true;
        } else {
          const err = await res.json();
          console.warn('Unlock failed:', err.error);
          return false;
        }
      } catch (e) {
        console.warn('Failed to unlock episode on server', e);
        return false;
      }
    }
    return false;
  }
});

// On startup, fetch fresh profile from backend
if (userStore.isLoggedIn) {
  userStore.fetchProfile();
}
