<script setup>
import { Icon } from '@iconify/vue';
import AppNavbar from '../../../components/app/AppNavbar.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseState from '../../../components/base/BaseState.vue';

const cards = [
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
];
</script>

<template>
  <div class="py-4 space-y-6">
    <AppNavbar />

    <div
      class="grid gap-4 items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <BaseCard
        v-for="(card, index) in cards"
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
                <label class="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="appearance-none w-5 h-5 border-2 border-neutral-300 rounded-full peer transition cursor-pointer checked:bg-neutral-300 dark:border-neutral-600 dark:checked:bg-neutral-600"
                  />
                  <Icon
                    icon="ri:check-fill"
                    class="hidden absolute top-1 left-1 size-3 text-white peer-checked:block dark:text-neutral-900"
                  />
                </label>
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
          <form class="p-6 border-t border-neutral-100 dark:border-neutral-800">
            <input
              type="text"
              class="h-13 px-5 w-full border border-transparent rounded-2xl bg-neutral-50 transition placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-neutral-300 dark:bg-neutral-800 dark:placeholder:text-neutral-500 dark:focus:bg-neutral-800 dark:focus:border-neutral-600 dark:text-white"
              placeholder="Add new activities"
              required
            />
          </form>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
