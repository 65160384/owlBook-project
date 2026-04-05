<template>
  <div class="popular-container">
    <h3 class="popular-title">ยอดนิยม</h3>
    <div class="popular-list">
      <router-link v-for="(c, idx) in topComics" :key="c.id" :to="`/comic/${c.id}`" class="popular-item">
        <div class="rank">{{ idx + 1 }}</div>
        <img :src="c.image" class="pop-thumb" :alt="c.title" />
        <div class="pop-info">
          <div class="pop-title" :title="c.title">{{ c.title }}</div>
          <div class="pop-tags">หมวดหมู่: {{ (c.tags || []).slice(0,4).join(', ') }}</div>
          <div class="pop-rating">
            <div class="stars">
              <span v-for="n in 5" :key="n" class="star">{{ starChar(n, c) }}</span>
            </div>
            <div class="rating-num">{{ c.rating || '—' }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  comics: { type: Array, default: () => [] },
  limit: { type: Number, default: 6 }
});

const topComics = computed(() => {
  // กรองเอาเฉพาะเรื่องที่ไม่ได้ถูกซ่อน (hidden: false) ออกมาก่อน
  const list = (props.comics || []).filter(c => !c.hidden).slice();

  list.sort((a,b) => {
    const ra = parseFloat(a.rating) || 0;
    const rb = parseFloat(b.rating) || 0;
    if (rb !== ra) return rb - ra;
    const va = parseInt((a.views||'0').replace(/[^0-9]/g,'')) || 0;
    const vb = parseInt((b.views||'0').replace(/[^0-9]/g,'')) || 0;
    return vb - va;
  });
  return list.slice(0, props.limit);
});

const starChar = (n, comic) => {
  const r = parseFloat(comic.rating) || 0;
  const outOf5 = Math.round((r / 10) * 5);
  return n <= outOf5 ? '★' : '☆';
}
</script>

<style scoped>
.popular-container{ background: transparent; }
.popular-title{ margin: 0 0 10px; color: var(--text-h); font-size:18px }
.popular-list{ display:flex; flex-direction:column; gap:14px }
.popular-item{ display:flex; align-items:flex-start; gap:10px; padding:8px; border-radius:8px; text-decoration:none; color:inherit; box-sizing:border-box; min-width:0 }
  .popular-item:hover{ background: rgba(255,255,255,0.02) }
  .rank{ width:22px; height:22px; flex:0 0 22px; border-radius:6px; background: rgba(255,255,255,0.04); color:var(--text-h); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px }
  .pop-thumb{ width:44px; height:56px; object-fit:cover; border-radius:6px; flex-shrink:0 }
.pop-info{ flex:1; min-width:0; overflow:hidden }
.pop-title{ font-size:13px; font-weight:700; color:var(--text-h); line-height:1.15; max-height:40px; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; line-clamp:2; word-break:break-word }
.pop-tags{ font-size:12px; color:var(--text); margin-top:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block }
.pop-rating{ display:flex; align-items:center; gap:8px; margin-top:8px }
.stars{ color:#f6c55b; font-size:13px }
.rating-num{ color:var(--text); font-weight:700; font-size:13px }

@media (max-width:900px){
  .popular-item{ gap:8px; padding:6px }
  .pop-title{ font-size:13px }
}
</style>
