// /src/data/comics.js
import { reactive } from 'vue';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export const comics = reactive([]);
export const managedComics = reactive([]);

async function fetchUserComics(manage = false) {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const url = manage ? `${BACKEND}/api/user-comics?manage=true` : `${BACKEND}/api/user-comics`;
    const res = await fetch(url, { headers });
    if (!res.ok) return;
    const list = await res.json();

    const normalized = list.map((c) => {
      // 1. Resolve Cover Image
      let resolvedImage = '';
      if (c.image) {
        if (c.image.startsWith('http') || c.image.startsWith('data:')) {
          resolvedImage = c.image;
        } else if (c.image.startsWith('/uploads')) {
          resolvedImage = BACKEND + c.image;
        }
      }

      // 2. Resolve Episode Pages
      const enrichedEpisodes = (c.episodes || []).map((ep) => {
        let pages = [];
        if (ep.pages && Array.isArray(ep.pages)) {
           pages = ep.pages.map(p => {
             const pPath = p.path || p;
             return pPath.startsWith('http') ? pPath : BACKEND + pPath;
           });
        }

        return {
          ...ep,
          pages: pages.length,
          images: pages
        };
      });

      return {
        ...c,
        title: c.name,
        author: c.authors && c.authors.length > 0 ? c.authors[0].email : 'ไม่ระบุ',
        authorId: c.authors && c.authors.length > 0 ? c.authors[0].id : null,
        tags: c.categories ? c.categories.map(cat => cat.name) : [],
        image: resolvedImage,
        episodes: enrichedEpisodes,
        freeEpisodes: c.freeEpisodes || 0,
        views: c.views || '0',
        rating: c.rating || '0'
      };
    });

    // Clear and refill target array
    const target = manage ? managedComics : comics;
    target.splice(0, target.length, ...normalized);
  } catch (e) {
    console.warn('Could not fetch comics from backend', e);
  }
}

// Initial fetch for discovery
fetchUserComics();

export { fetchUserComics };