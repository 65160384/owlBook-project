<script setup>
import ComicGrid from "../components/ComicGrid.vue";
import "@/assets/styles/home.css"
import { comics } from "@/data/comics"
</script>

<template>
  <div class="home">
    <h1>Popular Comics</h1>
    <ComicGrid :comics="comics" :columns="4" />
  </div>
</template>

