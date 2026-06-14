<script setup>
import { Icon } from '@iconify/vue';
import AppNavbar from '../../../components/app/AppNavbar.vue';
import { computed, ref } from 'vue';
import CardCard from '../../card/components/CardCard.vue';
import BaseState from '../../../components/base/BaseState.vue';
import { supabase } from '../../../core/supabase';
import { hideAllPoppers } from 'floating-vue';

const cards = ref([]);

const lastNewCard = computed(() => {
  const newCards = cards.value.filter((card) =>
    card.name.toLowerCase().startsWith('kartu'),
  );

  return !newCards.length ? 0 : +newCards[newCards.length - 1].name.slice(5);
});
const chunkCards = computed(() => {
  if (window.innerWidth < 640) {
    return [cards.value.map((card, index) => ({ index, ...card }))];
  }

  const length =
    window.innerWidth < 1024 ? 2 : window.innerWidth < 1280 ? 3 : 4;

  const res = Array.from({ length }, () => []);

  cards.value.forEach((card, index) => {
    res[index % length].push({
      index,
      ...card,
    });
  });

  return res;
});

async function loadCards() {
  const { data, error } = await supabase
    .from('cards')
    .select()
    .order('id', { ascending: true });

  if (!error) {
    cards.value = data;
  }
}

async function onNewCard() {
  const card = {
    id: Date.now(),
    name: `Kartu ${lastNewCard.value + 1}`,
    wasCreated: true,
  };

  cards.value.push(card);

  const { data, error } = await supabase
    .from('cards')
    .insert({
      name: card.name,
    })
    .select();

  if (!error) {
    const createdIndex = cards.value.findIndex(
      (createdCard) => createdCard.id === card.id,
    );

    cards.value[createdIndex].id = data[0].id;
  }
}
async function onRemoveCard(task, index) {
  cards.value.splice(index, 1);

  hideAllPoppers();

  await supabase.from('cards').delete().eq('id', task.id);
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
        <CardCard
          v-for="(card, index) in chunk"
          :key="index"
          v-model="cards[card.index]"
          @delete="onRemoveCard(card, index)"
        />
      </div>
    </div>
  </div>
</template>
