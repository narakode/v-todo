<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  icon: String,
  tag: {
    type: String,
    default: 'button',
  },
});
</script>

<template>
  <component
    :is="tag"
    class="block w-10 h-10 border border-neutral-200 text-neutral-900 rounded-full flex items-center justify-center transition hover:bg-black hover:border-black hover:text-white dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-400 dark:hover:border-neutral-800 dark:hover:bg-neutral-800"
  >
    <slot>
      <Icon :icon="icon" class="size-6" />
    </slot>
  </component>
</template>
