<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from './core/auth/auth.compose';

const { setUser: setAuthuser, checkLoggedIn } = useAuth();
const router = useRouter();
const route = useRoute();

async function setUser() {
  if (await checkLoggedIn()) {
    if (!(await setAuthuser())) {
      router.push({ name: 'login' });
    }
  }
}

setUser();
</script>

<template>
  <component :is="route.meta.layout || 'div'">
    <router-view
      class="bg-neutral-50 text-neutral-900 min-h-screen px-4 dark:bg-black"
    />
  </component>
</template>
