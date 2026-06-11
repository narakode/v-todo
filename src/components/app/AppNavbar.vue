<script setup>
import { Icon } from '@iconify/vue';
import BaseIconButton from '../base/BaseIconButton.vue';
import { toggleDarkMode } from '../../utils/theme';
import { useAuth } from '../../core/auth/auth.compose';
import { useRouter } from 'vue-router';

const { logout } = useAuth();
const router = useRouter();

async function onLogout() {
  await logout();

  router.push({ name: 'login' });
}
</script>

<template>
  <div class="flex items-center justify-end gap-2">
    <BaseIconButton
      :bordered="false"
      title="Github Repository"
      icon="ri:github-fill"
      tag="a"
      href="https://github.com/ibrahimalanshor/v-todo"
    />

    <BaseIconButton
      :bordered="false"
      title="Toggle Dark Mode"
      @click="toggleDarkMode"
    >
      <Icon icon="ri:moon-fill" class="size-5 dark:hidden" />
      <Icon icon="ri:sun-fill" class="size-5 hidden dark:block" />
    </BaseIconButton>
    <VDropdown placement="bottom-end">
      <BaseIconButton title="User Menu" icon="ri:user-fill" :bordered="false" />

      <template #popper>
        <div class="min-w-48 p-1.5 flex flex-col bg-white dark:bg-neutral-800">
          <button
            class="w-full text-left px-3 py-2 text-neutral-700 rounded-lg transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
            @click="onLogout"
          >
            Logout
          </button>
        </div>
      </template>
    </VDropdown>
  </div>
</template>
