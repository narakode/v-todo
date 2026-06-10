<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div
    class="flex items-center gap-2 px-4 py-3 text-red-700 bg-red-50 border border-red-100 rounded-xl dark:bg-red-950 dark:border-red-900 dark:text-red-300"
  >
    <Icon icon="ri:alert-fill" class="size-4" />
    <slot />
  </div>
</template>
