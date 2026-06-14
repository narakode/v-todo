<script setup>
import BaseButton from '../../../components/base/BaseButton.vue';
import { supabase } from '../../../core/supabase';

function onGoogleLogin() {
  supabase.auth.signInWithOAuth({
    provider: 'google',
  });
}
</script>

<template>
  <div class="relative flex items-center">
    <div
      class="flex-grow border-t border-neutral-200 dark:border-neutral-800"
    ></div>
    <span class="mx-4 shrink-0 text-sm text-neutral-400 dark:text-neutral-500"
      >atau</span
    >
    <div
      class="flex-grow border-t border-neutral-200 dark:border-neutral-800"
    ></div>
  </div>
  <BaseButton color="light" icon="ri:google-fill" @click="onGoogleLogin">
    Google
  </BaseButton>
</template>
