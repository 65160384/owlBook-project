<script setup>

defineProps(["episode"])

</script>

<template>
    <div class="episode">
        <p>Episode {{ episode.number }}</p>
        <router-link :to="`/episode/${episode.id}`">
            Read
        </router-link>
    </div>

</template>