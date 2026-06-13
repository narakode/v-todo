<script setup>
import { ref, useTemplateRef } from 'vue';

const input = useTemplateRef('input');
const value = defineModel();

defineExpose({ input });
</script>

<template>
  <input
    ref="input"
    :class="[
      'w-full border-b border-neutral-300 pb-0.5 text-[1.05rem] focus:outline-none dark:border-neutral-700',
    ]"
    required
    v-model="value"
  />
</template>
