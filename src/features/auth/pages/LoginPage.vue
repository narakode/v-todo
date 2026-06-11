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
import BaseIconButton from '../../../components/base/BaseIconButton.vue';
import { toggleDarkMode } from '../../../utils/theme';
import { Icon } from '@iconify/vue';

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
  <div class="h-full flex flex-col gap-6 items-center justify-center">
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
      <p class="text-center text-base text-neutral-600 dark:text-neutral-400">
        Belum punya akun?
        <BaseLink tag="router-link" :to="{ name: 'register' }">
          Daftar sekarang
        </BaseLink>
      </p>
    </BaseCard>
    <div class="flex items-center gap-2">
      <BaseIconButton
        title="Github Repository"
        icon="ri:github-fill"
        tag="a"
        href="https://github.com/ibrahimalanshor/v-todo"
      />
      <BaseIconButton title="Toggle Dark Mode" @click="toggleDarkMode">
        <Icon icon="ri:moon-fill" class="size-5 dark:hidden" />
        <Icon icon="ri:sun-fill" class="size-5 hidden dark:block" />
      </BaseIconButton>
    </div>
  </div>
</template>
