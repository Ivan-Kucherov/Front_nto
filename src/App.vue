<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'
import HeaderItem from './components/HeaderItem.vue'

</script>

<template>
  <header>

    <HeaderItem />
  </header>
  <div class="body">
  <RouterView />
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

.body {
  display: flex;
  justify-content: center;
  
}
</style>
