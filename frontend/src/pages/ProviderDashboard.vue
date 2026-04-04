<template>
  <div class="main-container">
    <div class="dashboard-header">
      <h2 class="page-title">Creator Studio</h2>
    </div>

    <div class="dashboard-card" style="padding: 0; overflow: hidden;">
      <table class="manage-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Latest Ep</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comic in comics" :key="comic.id">
            <td data-label="Cover"><img :src="comic.image" class="thumb-mini" /></td>
            <td data-label="Title" class="col-info">
              <div class="manga-title">{{ comic.title }}</div>
            </td>
            <td data-label="Latest Ep">ตอนที่ {{ comic.episodes.length }}</td>
            <td data-label="Actions">
              <button class="btn-action btn-edit">➕ Upload New Ep</button>
              <button class="btn-action btn-edit" style="background: #64748b;">View History</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { comics } from "@/data/comics";
import "@/assets/styles/manage-comics.css";
</script>