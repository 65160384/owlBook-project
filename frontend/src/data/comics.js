// /src/data/comics.js

// 1. ดึงไฟล์รูปภาพหน้าปกจากโฟลเดอร์ assets
const covers = import.meta.glob('/src/assets/comics/*/cover.{png,jpg}', {
  eager: true,
  import: 'default'
});

// 2. แก้ไข: เปลี่ยนจาก info.json เป็น index.json ตามโครงสร้างจริง
const infos = import.meta.glob('/src/assets/comics/*/index.json', {
  eager: true,
  import: 'default'
});

// 3. กวาดรูปภาพทั้งหมดในทุกโฟลเดอร์ตอน
const allPages = import.meta.glob('/src/assets/comics/*/*/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default'
});

export const comics = Object.keys(covers).map((path) => {
  const parts = path.split('/');
  const id = parts[4]; 

  // แก้ไข: เปลี่ยนชื่อไฟล์เป็น index.json
  const infoPath = `/src/assets/comics/${id}/index.json`;
  const infoData = infos[infoPath] || {};

  const episodesWithAutoData = (infoData.episodes || []).map((ep) => {
    // กรองหาไฟล์รูปภาพที่อยู่ในโฟลเดอร์ของมังงะเรื่องนี้และตอนนี้
    const episodePageKeys = Object.keys(allPages)
      .filter((pagePath) =>
        pagePath.includes(`/src/assets/comics/${id}/${ep.id}/`)
      )
      .sort(); 

    return {
      ...ep,
      pages: episodePageKeys.length,
      // ดึง URL รูปภาพมาใส่ใน Array เพื่อให้ Reader ใช้งานได้
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