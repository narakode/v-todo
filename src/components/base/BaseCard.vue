<script setup>
const props = defineProps({
  title: String,
  paddless: Boolean,
  withDivider: Boolean,
  withHeader: Boolean,
});
</script>

<template>
  <div
    :class="[
      'bg-white border border-neutral-200 rounded-3xl text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white',
      paddless || withDivider ? '' : 'p-6',
      withDivider ? 'divide-y divide-neutral-100 dark:divide-neutral-800' : '',
    ]"
  >
    <header v-if="withHeader || title" :class="[withDivider ? 'p-6' : '']">
      <slot name="header">
        <h2 v-if="title" class="font-bold text-2xl tracking-tight">
          {{ title }}
        </h2>
      </slot>
    </header>
    <slot />
    <footer v-if="$slots.footer" class="p-6">
      <slot name="footer" />
    </footer>
  </div>
</template>
