<script setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  loading: Boolean,
  icon: String,
  fullwidth: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'primary',
  },
});

const size = computed(() => {
  return {
    xs: 'h-8 px-3 text-sm rounded-lg',
    sm: 'h-10 px-4 text-sm rounded-xl',
    md: 'h-13 px-5 rounded-2xl',
  }[props.size];
});
const color = computed(() => {
  return {
    ghost:
      'bg-transparent text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-200 disabled:hover:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:focus:ring-neutral-700 dark:disabled:hover:bg-transparent',
    primary:
      'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900 disabled:hover:bg-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-white dark:focus:ring-offset-neutral-900 dark:disabled:hover:bg-white',
  }[props.color];
});
</script>

<template>
  <button
    :disabled="loading"
    :class="[
      'flex items-center justify-center gap-2 font-medium text-base transition',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
      fullwidth ? 'w-full' : '',
      size,
      color,
    ]"
  >
    <Icon v-if="loading" icon="gg:spinner" class="animate-spin size-5" />
    <Icon v-else-if="icon" :icon="icon" class="size-5" />
    <slot />
  </button>
</template>
