<script setup>
import { useId } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const id = useId();
</script>

<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-base font-medium text-neutral-700 dark:text-white"
    >
      {{ label }}
    </label>
    <slot :id="id" />
  </div>
</template>
