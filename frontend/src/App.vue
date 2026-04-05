<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />

  <main class="main-container">
    <router-view />
  </main>
</template>

<style>
.main-container {
  max-width: none;
  margin: auto;
  padding: 0;
}
</style>