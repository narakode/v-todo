<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  icon: String,
  tag: {
    type: String,
    default: 'button',
  },
  bordered: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      'block w-10 h-10 text-neutral-900 rounded-full flex items-center justify-center transition hover:bg-black hover:text-white dark:text-neutral-400 dark:hover:text-neutral-400 dark:hover:bg-neutral-800',
      bordered
        ? 'border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-neutral-800'
        : '',
    ]"
  >
    <slot>
      <Icon :icon="icon" class="size-6" />
    </slot>
  </component>
</template>
