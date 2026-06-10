<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <BaseCard class="min-w-md p-6 space-y-4">
      <h2 class="font-bold text-2xl tracking-tight">Masuk Dengan</h2>

      <div class="mb-4">
        <label
          for="email-address"
          class="block mb-2 text-base font-medium text-neutral-700 dark:text-white"
        >
          Alamat Email
        </label>
        <input
          type="email"
          id="email-address"
          class="h-13 px-5 w-full border border-transparent rounded-2xl bg-neutral-50 transition placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-neutral-300 dark:bg-neutral-800 dark:placeholder:text-neutral-500 dark:focus:bg-neutral-800 dark:focus:border-neutral-600 dark:text-white"
          placeholder="jhon@gmail.com"
          required
        />
      </div>

      <div class="mb-4">
        <label
          for="password"
          class="block mb-2 text-base font-medium text-neutral-700 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          class="h-13 px-5 w-full border border-transparent rounded-2xl bg-neutral-50 transition placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-neutral-300 dark:bg-neutral-800 dark:placeholder:text-neutral-500 dark:focus:bg-neutral-800 dark:focus:border-neutral-600 dark:text-white"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        class="h-13 px-5 w-full flex items-center justify-center rounded-2xl bg-neutral-900 text-white font-medium text-base transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-white dark:focus:ring-offset-neutral-900"
      >
        Masuk
      </button>
      <p class="text-center text-base text-neutral-600 dark:text-neutral-400">
        Belum punya akun?
        <a
          href="#"
          class="font-medium text-neutral-900 hover:underline dark:text-white transition"
        >
          Daftar sekarang
        </a>
      </p>
    </BaseCard>
  </div>
</template>
