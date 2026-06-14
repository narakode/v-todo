<script setup>
defineProps({
  hover: {
    type: Boolean,
    default: true,
  },
  tag: {
    type: String,
    default: 'button',
  },
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      'w-full text-left px-3 py-2 text-neutral-700 rounded-lg transition dark:text-neutral-200',
      hover ? 'hover:bg-neutral-100 dark:hover:bg-neutral-700' : '',
    ]"
  >
    <slot />
  </component>
</template>
