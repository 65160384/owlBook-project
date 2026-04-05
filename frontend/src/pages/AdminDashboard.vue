<template>
  <div class="main-container">
    <div class="dashboard-header">
      <h2 class="page-title">Admin Console</h2>
      <button class="btn-action btn-add">➕ Add New Series</button>
    </div>

    <div class="stats-grid">
      <div class="stat-box"><h3>Total Users</h3><p>1,250</p></div>
      <div class="stat-box"><h3>Comics</h3><p>{{ comics.length }}</p></div>
      <div class="stat-box"><h3>Revenue</h3><p>฿45,000</p></div>
    </div>

    <div class="dashboard-card" style="padding: 0; overflow: hidden;">
      <table class="manage-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Manga Details</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comic in comics" :key="comic.id">
            <td data-label="Cover"><img :src="comic.image" class="thumb-mini" /></td>
            <td data-label="Manga Details" class="col-info">
              <div class="manga-title">{{ comic.title }}</div>
              <div class="manga-meta">ID: {{ comic.id }} | Eps: {{ comic.episodes.length }}</div>
            </td>
            <td data-label="Status"><span class="status-badge success">Active</span></td>
            <td data-label="Actions">
              <button class="btn-action btn-edit">Edit Info</button>
              <button class="btn-action btn-edit" style="background: #8b5cf6;">Manage Eps</button>
              <button class="btn-action btn-delete">Hide/Delete</button>
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