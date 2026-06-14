<script setup>
import BaseIconButton from '../base/BaseIconButton.vue';
import { toggleDarkMode } from '../../utils/theme';
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="h-full flex flex-col gap-6 items-center justify-center">
    <slot />
    <div class="flex items-center gap-2">
      <BaseIconButton
        title="Github Repository"
        icon="ri:github-fill"
        tag="a"
        :bordered="false"
        href="https://github.com/narakode/v-todo"
      />
      <BaseIconButton
        :bordered="false"
        title="Toggle Dark Mode"
        @click="toggleDarkMode"
      >
        <Icon icon="ri:moon-fill" class="size-5 dark:hidden" />
        <Icon icon="ri:sun-fill" class="size-5 hidden dark:block" />
      </BaseIconButton>
    </div>
  </div>
</template>
