<script setup>
import DefaultHeader from '@/components/DefaultHeader.vue'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <DefaultHeader />
    <slot />
  </div>
</template>
