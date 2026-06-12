<script setup>
import { Icon } from '@iconify/vue';
import AppNavbar from '../../../components/app/AppNavbar.vue';
import { computed, ref } from 'vue';
import CardCard from '../../card/components/CardCard.vue';
import BaseState from '../../../components/base/BaseState.vue';
import { supabase } from '../../../core/supabase';

const cards = ref([]);
const chunkCards = computed(() => {
  const res = Array.from({ length: 4 }, () => []);

  cards.value.forEach((card, index) => {
    res[index % 4].push(card);
  });

  return res;
});

async function loadCards() {
  const { data, error } = await supabase.from('cards').select();

  if (!error) {
    cards.value = data;
  }
}

async function onNewCard() {
  const name = `New Card ${cards.value.length + 1}`;

  cards.value.push({
    name,
  });

  const { data, error } = await supabase.from('cards').insert({
    name,
  });
}

loadCards();
</script>

<template>
  <div class="py-4 space-y-6">
    <AppNavbar @new-todo="onNewCard" />

    <BaseState
      v-if="!cards.length"
      icon="ri:task-line"
      title="Kartumu Masih Kosong"
      description="Tambah kartu baru untuk menambahkan aktifitasmu"
    />

    <div
      v-else
      class="grid gap-4 items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div v-for="(chunk, index) in chunkCards" :key="index" class="space-y-4">
        <CardCard v-for="(card, index) in chunk" :key="index" :card="card" />
      </div>
    </div>
  </div>
</template>
