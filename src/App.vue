<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'
import HeaderItem from './components/HeaderItem.vue'

</script>

<template>
  <header>

    <HeaderItem />
  </header>
  <RouterView />
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

body {
  display: flex;
  place-items: center;
  background-color: rgba(109, 255, 141, 0.425);
}
</style>
