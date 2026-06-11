<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  icon: String,
  title: String,
  description: String,
});
</script>

<template>
  <div class="text-center flex flex-col justify-center items-center gap-4">
    <div
      class="w-18 h-18 bg-neutral-50 rounded-full flex items-center justify-center dark:bg-neutral-800"
    >
      <Icon
        :icon="icon"
        class="size-10 text-neutral-300 dark:text-neutral-600"
      />
    </div>
    <div class="max-w-[200px]">
      <p class="text-lg font-semibold text-neutral-900 dark:text-white">
        {{ title }}
      </p>
      <p class="text-neutral-400 leading-relaxed dark:text-neutral-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>
