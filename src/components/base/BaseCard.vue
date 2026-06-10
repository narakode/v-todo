<script setup>
const props = defineProps({
  title: String,
  paddless: Boolean,
});
</script>

<template>
  <div
    :class="[
      'bg-white border border-neutral-200 rounded-3xl text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white',
      paddless ? '' : 'p-6',
    ]"
  >
    <h2 v-if="title" class="font-bold text-2xl tracking-tight">{{ title }}</h2>
    <slot />
  </div>
</template>
