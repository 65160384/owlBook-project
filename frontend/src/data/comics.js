// /src/data/comics.js
import { reactive } from 'vue';

// 1. ดึงไฟล์รูปภาพหน้าปกจากโฟลเดอร์ assets
const covers = import.meta.glob('/src/assets/comics/*/cover.{png,jpg}', {
  eager: true,
  import: 'default'
});

// 2. เปลี่ยนจาก info.json เป็น index.json ตามโครงสร้างจริง
const infos = import.meta.glob('/src/assets/comics/*/index.json', {
  eager: true,
  import: 'default'
});

// 3. กวาดรูปภาพทั้งหมดในทุกโฟลเดอร์ตอน
const allPages = import.meta.glob('/src/assets/comics/*/*/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default'
});

const assetComics = Object.keys(covers).map((path) => {
  const parts = path.split('/');
  const id = parts[4];

  const infoPath = `/src/assets/comics/${id}/index.json`;
  const infoData = infos[infoPath] || {};

  const episodesWithAutoData = (infoData.episodes || []).map((ep) => {
    const episodePageKeys = Object.keys(allPages)
      .filter((pagePath) =>
        pagePath.includes(`/src/assets/comics/${id}/${ep.id}/`)
      )
      .sort();

    return {
      ...ep,
      pages: episodePageKeys.length,
      images: episodePageKeys.map((key) => allPages[key])
    };
  });

  return {
    id,
    title: id.replace(/-/g, ' '),
    image: covers[path],
    ...infoData,
    episodes: episodesWithAutoData
  };
});

// Fetch user-created comics from backend prototype if available
const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const initial = [...assetComics];
export const comics = reactive(initial);

async function fetchUserComics() {
  try {
    const res = await fetch(`${BACKEND}/api/user-comics`);
    if (!res.ok) return;
    const list = await res.json();
    // Map upload paths to full URL
    const normalized = list.map((c) => ({
      ...c,
      image: c.image && c.image.startsWith('/uploads/') ? (BACKEND + c.image) : c.image
    }));
    // Append user comics after assets
    normalized.forEach((c) => comics.push(c));
  } catch (e) {
    // silently fail; backend is optional in dev
    // console.warn('Could not fetch user comics', e);
  }
}

// try loading user comics (non-blocking)
fetchUserComics();

// Helper to persist only the user-created comics (those with id starting with 'user-')
export function persistUserComicsFromList(list) {
  try {
    const uploads = JSON.parse(localStorage.getItem('uploads') || '{}');
    // helper to find the upload key for a dataURL image (so we persist path instead of full data)
    const findUploadKey = (dataUrl) => {
      for (const k of Object.keys(uploads)) {
        if (uploads[k] === dataUrl) return k;
      }
      return null;
    };

    const userItems = list.filter((c) => typeof c.id === 'string' && c.id.startsWith('user-'))
      .map(({ id, title, description, author, year, image, tags, episodes }) => {
        let storedImage = image;
        if (typeof image === 'string' && image.startsWith('data:')) {
          const found = findUploadKey(image);
          storedImage = found || image; // prefer storing a path if available
        }
        return { id, title, description, author, year, image: storedImage, tags, episodes };
      });

    localStorage.setItem('userComics', JSON.stringify(userItems));
  } catch (e) {
    console.warn('Failed to persist user comics', e);
  }
}