<script setup>
defineProps({
  tag: {
    type: null,
    default: 'a',
  },
});
</script>

<template>
  <component
    :is="tag"
    class="font-medium text-neutral-900 hover:underline dark:text-white transition"
  >
    <slot />
  </component>
</template>
