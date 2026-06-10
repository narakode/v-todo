<script setup>
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseLink from '../../../components/base/BaseLink.vue';
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <BaseCard title="Masuk untuk Melanjutkan" class="min-w-md p-6 space-y-4">
      <BaseFormItem label="Email" v-slot="id">
        <BaseInput
          type="email"
          :id="id"
          placeholder="jhon@gmail.com"
          required
        />
      </BaseFormItem>

      <BaseFormItem label="Password" v-slot="id">
        <BaseInput type="password" :id="id" placeholder="••••••••" required />
      </BaseFormItem>

      <BaseButton type="submit"> Masuk </BaseButton>
      <p class="text-center text-base text-neutral-600 dark:text-neutral-400">
        Belum punya akun?
        <BaseLink href="#"> Daftar sekarang </BaseLink>
      </p>
    </BaseCard>
  </div>
</template>
