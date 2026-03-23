<script setup>
import "@/assets/styles/navbar.css"
</script>

<template>

<nav class="navbar">

<div class="logo">
<img src="/logo/owlbook.png" alt="OwlBook Logo" width="32" height="32">
OwlBook
</div>

<div class="menu">

<router-link to="/">Home</router-link>

<router-link to="/favorites">Favorites</router-link>

<router-link to="/coin">Coin</router-link>

<router-link to="/login">Login</router-link>

</div>

</nav>

</template>

