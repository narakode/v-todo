<script setup>
import { Icon } from '@iconify/vue';
import BaseIconButton from '../base/BaseIconButton.vue';
import { toggleDarkMode } from '../../utils/theme';
import { useAuth } from '../../core/auth/auth.compose';
import { useRouter } from 'vue-router';
import BaseButton from '../base/BaseButton.vue';
import BaseDropdownItem from '../base/BaseDropdownItem.vue';

defineEmits(['new-todo']);

const { logout } = useAuth();
const router = useRouter();

async function onLogout() {
  await logout();

  router.push({ name: 'login' });
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <BaseButton icon="ri:add-fill" @click="$emit('new-todo')"
        >Tambah Card</BaseButton
      >
    </div>
    <div class="flex items-center gap-2">
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
        <BaseIconButton
          title="User Menu"
          icon="ri:user-fill"
          :bordered="false"
        />

        <template #popper>
          <div class="min-w-48 p-1.5 flex flex-col">
            <BaseDropdownItem @click="onLogout"> Logout </BaseDropdownItem>
          </div>
        </template>
      </VDropdown>
    </div>
  </div>
</template>
