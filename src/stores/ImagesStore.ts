import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useImagesStore = defineStore('images', () => {
  const images = ref([])

  return { images }
})
