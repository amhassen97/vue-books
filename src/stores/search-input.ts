import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchInputStore = defineStore('search-input', () => {
  const searchValue = ref('')
  const fetchEnabled = ref(false)
  // const fetchEnabled = computed(() => Boolean(searchValue.value?.trim()))

  const fetchedData = ref({})

  return { searchValue, fetchEnabled, fetchedData }
})
