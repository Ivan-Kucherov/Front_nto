import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useImagesStore = defineStore('images', () => {
  const images = ref([])
  const response_images = ref([])
  const type = ref('all')

  return { images ,response_images,type}
})
