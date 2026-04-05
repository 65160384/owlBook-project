import { reactive } from 'vue';
import { userStore } from './userStore';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export const favoriteStore = reactive({
  list: [],
  
  isFavorite(comicId) {
    return this.list.includes(String(comicId));
  },

  async toggle(comicId) {
    if (!userStore.isLoggedIn) {
      alert('Please login to favorite comics');
      return;
    }

    try {
      const res = await fetch(`${BACKEND}/api/auth/toggle-favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userStore.token}`
        },
        body: JSON.stringify({ cartoons_id: comicId })
      });

      if (res.ok) {
        const data = await res.json();
        const idStr = String(comicId);
        if (data.status === 'added') {
          if (!this.list.includes(idStr)) this.list.push(idStr);
        } else {
          this.list = this.list.filter(id => id !== idStr);
        }
      }
    } catch (e) {
      console.warn('Failed to toggle favorite', e);
    }
  },

  setFavorites(newList) {
    this.list = newList.map(id => String(id));
  },

  clear() {
    this.list = [];
  }
});