<script setup>
const props = defineProps({
  title: String,
  paddless: Boolean,
  withDivider: Boolean,
});
</script>

<template>
  <div
    :class="[
      'bg-white border border-neutral-200 rounded-3xl text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white',
      paddless || withDivider ? '' : 'p-6',
    ]"
  >
    <div
      v-if="title"
      :class="[
        withDivider
          ? 'p-6 border-b border-neutral-100 dark:border-neutral-800'
          : '',
      ]"
    >
      <h2 v-if="title" class="font-bold text-2xl tracking-tight">
        {{ title }}
      </h2>
    </div>
    <slot />
  </div>
</template>
