<script setup>
import { Icon } from '@iconify/vue';
import BaseIconButton from '../base/BaseIconButton.vue';
import { toggleDarkMode } from '../../utils/theme';
import { useAuth } from '../../core/auth/auth.compose';
import { useRouter } from 'vue-router';
import BaseButton from '../base/BaseButton.vue';
import BaseDropdownItem from '../base/BaseDropdownItem.vue';

defineEmits(['new-todo']);

const { logout, user } = useAuth();
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
        >Tambah Kartu</BaseButton
      >
    </div>
    <div class="flex items-center gap-2">
      <BaseIconButton
        :bordered="false"
        title="Repository Github"
        icon="ri:github-fill"
        tag="a"
        href="https://github.com/narakode/v-todo"
      />

      <BaseIconButton
        :bordered="false"
        title="Aktifkan Dark/Light Mode"
        @click="toggleDarkMode"
      >
        <Icon icon="ri:moon-fill" class="size-5 dark:hidden" />
        <Icon icon="ri:sun-fill" class="size-5 hidden dark:block" />
      </BaseIconButton>
      <VDropdown placement="bottom-end">
        <BaseIconButton
          title="Menu Pengguna"
          icon="ri:user-fill"
          :bordered="false"
        />

        <template #popper>
          <div class="min-w-48 p-1.5 flex flex-col">
            <BaseDropdownItem :hover="false" class="font-semibold" tag="p">
              {{
                user.user.user_metadata?.name ?? user.user.user_metadata?.email
              }}
            </BaseDropdownItem>
            <div
              class="h-px bg-neutral-200 dark:bg-neutral-700 my-1 mx-2"
            ></div>
            <BaseDropdownItem @click="onLogout"> Logout </BaseDropdownItem>
          </div>
        </template>
      </VDropdown>
    </div>
  </div>
</template>
