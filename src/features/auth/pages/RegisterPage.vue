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

const router = useRouter();
const { register } = useAuth();

const form = reactive({
  email: null,
  password: null,
});
const loading = ref(false);
const errorMessage = ref(null);

async function onSubmit() {
  loading.value = true;
  errorMessage.value = null;

  const { error } = await register(form);

  if (error) {
    errorMessage.value = error;
  } else {
    router.push({ name: 'home' });
  }

  loading.value = false;
}
</script>

<template>
  <BaseCard title="Buat Akun Baru" class="w-full max-w-md space-y-6">
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
    <p class="text-center text-base text-neutral-600 dark:text-neutral-400">
      Sudah punya akun?
      <BaseLink tag="router-link" :to="{ name: 'login' }">
        Masuk sekarang
      </BaseLink>
    </p>
  </BaseCard>
</template>
