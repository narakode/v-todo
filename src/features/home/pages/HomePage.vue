<script setup>
import { Icon } from '@iconify/vue';
import AppNavbar from '../../../components/app/AppNavbar.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseState from '../../../components/base/BaseState.vue';
import BaseCheckbox from '../../../components/base/BaseCheckbox.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { computed, ref } from 'vue';

const cards = ref([
  {
    name: 'Daily Todo',
    tasks: [
      {
        id: 1,
        name: 'Check email',
      },
      {
        id: 2,
        name: 'Review pull request',
      },
    ],
  },
  {
    name: 'Shopping List',
    tasks: [
      {
        id: 3,
        name: 'Buy milk',
      },
      {
        id: 4,
        name: 'Buy eggs',
      },
    ],
  },
  {
    name: 'Todo Project',
    tasks: [],
  },
  {
    name: 'Learning Goals',
    tasks: [
      {
        id: 5,
        name: 'Study Vue 3',
      },
      {
        id: 6,
        name: 'Read Laravel documentation',
      },
    ],
  },
]);
const chunkCards = computed(() => {
  const res = Array.from({ length: 4 }, () => []);

  cards.value.forEach((card, index) => {
    res[index % 4].push(card);
  });

  return res;
});

function onNewTodo() {
  cards.value.push({
    name: `New Card ${cards.value.length + 1}`,
    tasks: [],
  });
}
</script>

<template>
  <div class="py-4 space-y-6">
    <AppNavbar @new-todo="onNewTodo" />

    <div
      class="grid gap-4 items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div v-for="(chunk, index) in chunkCards" :key="index" class="space-y-4">
        <BaseCard
          v-for="(card, index) in chunk"
          :key="index"
          :title="card.name"
          with-divider
        >
          <BaseState
            v-if="!card.tasks.length"
            class="p-4 min-h-60"
            title="All Done"
            icon="ri:checkbox-circle-line"
            description="No tasks for today, add some tasks below."
          />
          <div v-else class="space-y-1">
            <div class="p-4">
              <div
                v-for="task of card.tasks"
                :key="task.id"
                :class="[
                  'p-3 rounded-xl transition flex items-center justify-between gap-3 transition',
                  false ? 'bg-neutral-50/50 dark:bg-neutral-800/50' : '',
                ]"
              >
                <div class="flex items-center gap-3 grow">
                  <BaseCheckbox />
                  <p
                    :class="[
                      'font-medium',
                      false
                        ? 'text-neutral-400 line-through dark:text-neutral-600'
                        : 'text-neutral-700 dark:text-white',
                    ]"
                  >
                    {{ task.name }}
                  </p>
                </div>
                <button
                  class="cursor-pointer text-neutral-300 hover:text-red-500 dark:text-neutral-700 dark:hover:text-red-400"
                >
                  <Icon icon="ri:close-fill" class="size-5" />
                </button>
              </div>
            </div>
          </div>

          <template #footer>
            <form>
              <BaseInput placeholder="Add new activities" requred />
            </form>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
