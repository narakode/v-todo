<script setup>
import { Icon } from '@iconify/vue';

defineEmits(['change']);
const checked = defineModel();
</script>

<template>
  <label class="relative flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="appearance-none w-5 h-5 border-2 border-neutral-300 rounded-full peer transition cursor-pointer checked:bg-neutral-300 dark:border-neutral-600 dark:checked:bg-neutral-600"
      v-model="checked"
      @change="$emit('change')"
    />
    <Icon
      icon="ri:check-fill"
      class="hidden absolute top-1 left-1 size-3 text-white peer-checked:block dark:text-neutral-900"
    />
  </label>
</template>
