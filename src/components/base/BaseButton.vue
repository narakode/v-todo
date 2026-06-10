<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  loading: Boolean,
});
</script>

<template>
  <button
    :disabled="loading"
    class="h-13 px-5 w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white font-medium text-base transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-white dark:focus:ring-offset-neutral-900 dark:disabled:hover:bg-white"
  >
    <Icon v-if="loading" icon="gg:spinner" class="animate-spin size-5" />
    <slot />
  </button>
</template>
