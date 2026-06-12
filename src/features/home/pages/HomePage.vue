<script setup>
import { Icon } from '@iconify/vue';
import AppNavbar from '../../../components/app/AppNavbar.vue';
import { computed, ref } from 'vue';
import CardCard from '../../card/components/CardCard.vue';

const cards = ref([
  {
    name: 'Daily Todo',
  },
  {
    name: 'Shopping List',
  },
  {
    name: 'Todo Project',
  },
  {
    name: 'Learning Goals',
  },
]);
const chunkCards = computed(() => {
  const res = Array.from({ length: 4 }, () => []);

  cards.value.forEach((card, index) => {
    res[index % 4].push(card);
  });

  return res;
});

function onNewCard() {
  cards.value.push({
    name: `New Card ${cards.value.length + 1}`,
  });
}
</script>

<template>
  <div class="py-4 space-y-6">
    <AppNavbar @new-todo="onNewCard" />

    <div
      class="grid gap-4 items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div v-for="(chunk, index) in chunkCards" :key="index" class="space-y-4">
        <CardCard v-for="(card, index) in chunk" :key="index" :card="card" />
      </div>
    </div>
  </div>
</template>
