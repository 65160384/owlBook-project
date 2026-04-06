<template>
  <div class="main-container">
    <div class="dashboard-header">
      <h2 class="page-title">Content Management</h2>
      <div class="header-actions">
        <div class="filter-group">
          <input v-model="searchQuery" type="text" placeholder="Search title..." class="admin-search form-input" />
        </div>
        <button v-if="userStore.role === 'admin'" class="btn-add-main" @click="openModal(null)">
          ➕ Add New Series
        </button>
      </div>
    </div>

    <div class="dashboard-card no-padding">
      <table class="manage-table">
        <thead>
          <tr>
            <th class="th-cover">Cover</th>
            <th class="th-info">Title & Details</th>
            <th class="th-status">Status</th>
            <th class="th-action">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comic in filteredComics" :key="comic.id">
            <td data-label="Cover" class="col-cover">
              <img :src="absPath(comic.image)" class="thumb-mini-large" />
            </td>
            <td data-label="Details" class="col-info-left">
              <div class="manga-title">{{ comic.title }}</div>
              <div class="manga-meta">โดย: {{ comic.author || 'ไม่ระบุ' }}</div>
              <div class="tag-list-mini">
                <span v-for="tag in comic.tags" :key="tag" class="tag-mini">{{ tag }}</span>
              </div>
            </td>
            <td data-label="Status" class="col-status">
              <span :class="['status-badge', comic.hidden ? 'pending-badge' : 'active-badge']">
                {{ comic.hidden ? 'Pending' : 'Active' }}
              </span>
            </td>
            <td data-label="Actions" class="action-cell">
              <button class="btn-icon blue" @click="manageEpisodes(comic)">📄 <span
                  class="btn-label">EPs</span></button>
              <button class="btn-icon orange" @click="openModal(comic)">✏️ <span class="btn-label">Edit</span></button>
              <button v-if="userStore.role === 'admin'" class="btn-icon red" @click="toggleHide(comic)">
                {{ comic.hidden ? '👁️' : '🚫' }}
                <span class="btn-label">{{ comic.hidden ? 'Show' : 'Hide' }}</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ isEdit ? 'แก้ไขข้อมูลมังงะ' : 'เพิ่มมังงะเรื่องใหม่' }}</h3>
          <button class="close-btn" @click="showModal = false">&times;</button>
        </div>
        <div class="modal-body-scroll">
          <div class="edit-cover-section">
            <img :src="imagePreview || absPath(editForm.image)" class="preview-img-edit" />
            <div class="form-group" style="flex: 1;">
              <label>เปลี่ยนรูปหน้าปก (Upload New):</label>
              <input type="file" @change="handleImageUpload" accept="image/*" class="form-input" />
              <small class="help-text">* หากไม่เปลี่ยนจะใช้รูปเดิม</small>
            </div>
          </div>
          <div class="form-grid-2">
            <div class="form-group"><label>ชื่อเรื่อง (Title):</label><input v-model="editForm.title"
                class="form-input" /></div>
            <div class="form-group">
              <label>ผู้แต่ง (Author):</label>
              <select v-model="editForm.authorId" class="form-input" :disabled="userStore.role !== 'admin'">
                <option :value="null" disabled>-- เลือกผู้แต่ง --</option>
                <option v-for="auth in authors" :key="auth.id" :value="auth.id">
                  {{ auth.email }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group"><label>หมวดหมู่ (Tags) - แยกด้วย , :</label><input v-model="editForm.tagsString"
              class="form-input" /></div>
          <div class="form-group"><label>เรื่องย่อ (Description):</label><textarea v-model="editForm.description"
              class="form-input" rows="4"></textarea></div>
        </div>
        <div class="modal-footer">
          <button @click="showModal = false" class="btn-cancel">Cancel</button>
          <button @click="saveComic" class="btn-save">Save & Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { comics, managedComics, fetchUserComics } from "@/data/comics";
import { userStore } from "@/store/userStore";
import "@/assets/styles/manage-comics.css";

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const router = useRouter();
const searchQuery = ref('');
const showModal = ref(false);
const isEdit = ref(false);
const imagePreview = ref(null);
const fileToUpload = ref(null);
const authors = ref([]);
const editForm = ref({ id: '', title: '', author: '', authorId: null, description: '', image: '', tagsString: '' });

const filteredComics = computed(() => {
  return managedComics.filter(c => c.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const fetchAuthors = async () => {
  try {
    const res = await fetch(`${BACKEND}/api/auth/authors`, {
      headers: { 'Authorization': `Bearer ${userStore.token}` }
    });
    if (res.ok) authors.value = await res.json();
  } catch (e) {
    console.warn('Failed to fetch authors', e);
  }
};

onMounted(() => {
  fetchUserComics(true);
  fetchAuthors();
});

const openModal = (comic) => {
  imagePreview.value = null;
  fileToUpload.value = null;
  if (comic) {
    isEdit.value = true;
    editForm.value = { ...comic, tagsString: (comic.tags || []).join(', ') };
  } else {
    isEdit.value = false;
    editForm.value = { id: null, title: '', author: '', authorId: null, description: '', image: '', tagsString: '' };
  }
  showModal.value = true;
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    fileToUpload.value = file;
    const reader = new FileReader();
    reader.onload = (e) => { imagePreview.value = e.target.result; };
    reader.readAsDataURL(file);
  }
};

// ฟังก์ชันช่วยอัปเดตข้อมูลใน UI ทันที
const updateLocalUI = (payload) => {
  const idx = comics.findIndex(c => c.id === editForm.value.id);
  if (idx !== -1) {
    comics[idx] = { ...comics[idx], ...payload };
  } else {
    comics.push(payload);
  }
};

const saveComic = async () => {
  const finalTags = editForm.value.tagsString.split(',').map(t => t.trim()).filter(Boolean);
  
  const fd = new FormData();
  fd.append('name', editForm.value.title);
  fd.append('description', editForm.value.description);
  fd.append('authorId', editForm.value.authorId || '');
  fd.append('tags', JSON.stringify(finalTags));
  
  if (fileToUpload.value) {
    fd.append('image', fileToUpload.value);
  }

  try {
    const method = isEdit.value ? 'PATCH' : 'POST';
    const url = isEdit.value 
      ? `${BACKEND}/api/comics/${editForm.value.id}` 
      : `${BACKEND}/api/comics`;

    const res = await fetch(url, {
      method: method,
      headers: { 
        'Authorization': `Bearer ${userStore.token}` 
      },
      body: fd
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Server error");
    }

    const savedComic = await res.json();
    
    // Transform backend fields back to frontend fields for local UI sync
    const uiPayload = {
      ...savedComic,
      title: savedComic.name,
      tags: (savedComic.categories || []).map(c => c.name),
      author: (savedComic.authors || []).map(a => a.email).join(', ')
    };

    updateLocalUI(uiPayload);
    alert("บันทึกสำเร็จ!");
  } catch (e) {
    console.error(e);
    alert("เกิดข้อผิดพลาด: " + e.message);
  } finally {
    showModal.value = false;
  }
};

const toggleHide = async (comic) => {
  const newStatus = !comic.hidden;
  try {
    const res = await fetch(`${BACKEND}/api/comics/${comic.id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({ hidden: newStatus })
    });

    if (!res.ok) throw new Error("Server error");

    comic.hidden = newStatus;
    alert(newStatus ? "ซ่อนมังงะแล้ว (Pending)" : "แสดงมังงะแล้ว (Active)");
  } catch (e) {
    // Simulation Mode สำหรับ Hide/Unhide
    comic.hidden = newStatus;
    alert(newStatus ? "ซ่อนมังงะแล้ว (Pending - Simulation)" : "แสดงมังงะแล้ว (Active - Simulation)");
  }
};

const manageEpisodes = (comic) => { router.push({ name: 'EpisodeManager', params: { comicId: comic.id } }); };
const absPath = (p) => {
  if (!p) return '';
  if (p.startsWith('data:') || p.startsWith('http')) return p;
  return BACKEND + p;
};
</script>

<style scoped>
/* CSS ที่คุณ Gem ต้องการ */
.modal-body-scroll {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;
}

.edit-cover-section {
  display: flex;
  gap: 20px;
  align-items: center;
  background: var(--bg);
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.preview-img-edit {
  width: 100px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid var(--accent);
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.help-text {
  color: var(--mc-muted);
  font-size: 12px;
  display: block;
  margin-top: 4px;
}

.tag-list-mini {
  display: flex;
  gap: 5px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.tag-mini {
  font-size: 10px;
  background: var(--accent);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
}

/* Status Badges ปรับปรุงสีตามที่คุณ Gem ต้องการ */
.status-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
}

.active-badge {
  background: #dcfce7;
  /* สีเขียวสำหรับ Active */
  color: #166534;
}

.pending-badge {
  background: #fef3c7;
  /* สีเหลืองสำหรับ Pending */
  color: #92400e;
}

.manage-table tbody tr {
  transition: transform 0.2s, box-shadow 0.2s;
}

.manage-table tbody tr:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>