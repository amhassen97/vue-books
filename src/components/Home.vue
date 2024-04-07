<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { searchOpenLibraryBooks, useBookSearch } from '@/lib/utils'
import { useSearchInputStore } from '@/stores/search-input'
import { ref } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
const searchInputStore = useSearchInputStore()

// const isLoading = ref(false)

const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
  queryKey: ['bookSearch', ...[searchInputStore.searchValue ?? []]],
  queryFn: () => searchOpenLibraryBooks(searchInputStore.searchValue),
  enabled: searchInputStore.fetchEnabled
})

/* useBookSearch(
  searchInputStore.fetchEnabled,
  searchInputStore.searchValue
) */

const handleSearch = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // isLoading.value = true
    console.log('searchInputStore.searchValue: ', searchInputStore.searchValue)

    const hasValue = Boolean(searchInputStore?.searchValue?.trim())

    if (hasValue) {
      searchInputStore.fetchEnabled = true
      //   queryClient.invalidateQueries({ queryKey: ['bookSearch'] })
      refetch()
    }
    // searchInputStore.fetchedData = await searchOpenLibraryBooks(searchInputStore.searchValue)
    // isLoading.value = false
  } catch (e) {
    // isLoading.value = false
    throw e
  }
}
</script>

<template>
  <div class="flex justify-start items-center min-w-0 w-100 m-3 gap-2">
    <label class="input input-bordered flex flex-1 items-center gap-2">
      <input
        type="text"
        class="grow"
        placeholder="Search for a book"
        v-model="searchInputStore.searchValue"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="w-4 h-4 opacity-70"
      >
        <path
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </label>
    <button class="btn btn-active btn-primary" type="button" @click="handleSearch">Search</button>
  </div>
  <div>
    <div v-if="searchInputStore.searchValue?.trim() && (isLoading || isFetching)">Loading...</div>
    <!-- <div v-else-if="isError">Error: {{ error.message }}</div> -->
    <div v-else-if="data && Object.keys(data)?.length > 0">
      Data:
      <div>
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>
