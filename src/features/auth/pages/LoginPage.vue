<script setup>
import { reactive, ref } from 'vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseLink from '../../../components/base/BaseLink.vue';
import { useAuth } from '../../../core/auth/auth.compose';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../../core/supabase';
import GoogleLoginButton from '../components/GoogleLoginButton.vue';

const router = useRouter();
const { login } = useAuth();

const form = reactive({
  email: null,
  password: null,
});
const loading = ref(false);
const errorMessage = ref(null);

async function onSubmit() {
  loading.value = true;
  errorMessage.value = null;

  const { error } = await login(form);

  if (error) {
    errorMessage.value = error;
  } else {
    router.push({ name: 'home' });
  }

  loading.value = false;
}
</script>

<template>
  <BaseCard title="Masuk untuk Melanjutkan" class="w-full max-w-md space-y-6">
    <BaseAlert v-if="errorMessage">
      {{ errorMessage }}
    </BaseAlert>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <BaseFormItem label="Email" v-slot="id">
        <BaseInput
          type="email"
          name="email"
          :id="id"
          placeholder="jhon@gmail.com"
          required
          v-model="form.email"
        />
      </BaseFormItem>

      <BaseFormItem label="Password" v-slot="id">
        <BaseInput
          type="password"
          name="password"
          :id="id"
          placeholder="••••••••"
          required
          v-model="form.password"
        />
      </BaseFormItem>

      <BaseButton :loading="loading" type="submit"> Masuk </BaseButton>
    </form>
    <GoogleLoginButton />
    <p class="text-center text-base text-neutral-600 dark:text-neutral-400">
      Belum punya akun?
      <BaseLink tag="router-link" :to="{ name: 'register' }">
        Daftar sekarang
      </BaseLink>
    </p>
  </BaseCard>
</template>
