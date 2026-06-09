<script setup>
import { ref, useTemplateRef, nextTick } from 'vue';
import { Icon } from '@iconify/vue';
import { useTodoStore } from '../../../todo.store';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore();

const { todos } = storeToRefs(todoStore);

const newTodo = ref(null);
const editingIndex = ref(null);
const editValue = ref(null);
const editInput = useTemplateRef('editInput');
const saveEditButton = useTemplateRef('saveEditButton');

function onSave() {
  todoStore.create(newTodo.value);

  newTodo.value = null;
}
function onRemove(index) {
  todoStore.remove(index);
}
async function onOpenEditing(index) {
  editingIndex.value = index;
  editValue.value = todos.value[index].name;

  await nextTick();

  editInput.value[0].focus();
}
function onCloseEditing(e) {
  if (!saveEditButton.value[0].contains(e.target)) {
    editingIndex.value = false;
  }
}
function onSaveEdit() {
  todos.value[editingIndex.value].name = editValue.value;
  editingIndex.value = null;
}
function onToggleDarkMode() {
  localStorage.setItem(
    'theme',
    document.documentElement.classList.contains('dark') ? 'light' : 'dark',
  );

  document.documentElement.classList.toggle('dark');
}
</script>

<template>
  <div
    class="bg-neutral-50 text-neutral-900 min-h-screen flex items-center px-4 py-4 sm:py-10 lg:py-20 dark:bg-black"
  >
    <div
      class="max-w-md w-full mx-auto bg-white border border-neutral-200 rounded-3xl dark:bg-neutral-900 dark:border-neutral-800"
    >
      <div
        class="p-6 border-b border-neutral-100 flex items-center justify-between dark:border-neutral-800"
      >
        <div class="space-y-1">
          <p
            class="text-xs text-neutral-400 font-semibold tracking-wider uppercase dark:text-neutral-500"
          >
            Activities
          </p>
          <h1
            class="font-bold text-neutral-900 text-2xl tracking-tight dark:text-white"
          >
            Todo
          </h1>
        </div>
        <div class="flex items-center gap-2">
          <a
            href="https://github.com/ibrahimalanshor/v-todo"
            class="block w-10 h-10 border border-neutral-200 text-neutral-900 rounded-full flex items-center justify-center transition hover:bg-black hover:border-black hover:text-white dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-400 dark:hover:border-neutral-800 dark:hover:bg-neutral-800"
          >
            <Icon icon="ri:github-fill" class="size-6" />
          </a>
          <button
            title="Toggle Dark Mode"
            class="block w-10 h-10 border border-neutral-200 text-neutral-900 rounded-full flex items-center justify-center transition hover:bg-black hover:border-black hover:text-white dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-400 dark:hover:border-neutral-800 dark:hover:bg-neutral-800"
            @click="onToggleDarkMode"
          >
            <Icon icon="ri:moon-fill" class="size-5 dark:hidden" />
            <Icon icon="ri:sun-fill" class="size-5 hidden dark:block" />
          </button>
        </div>
      </div>
      <div
        v-if="!todos.length"
        class="p-4 text-center min-h-80 flex flex-col justify-center items-center gap-4"
      >
        <div
          class="w-18 h-18 bg-neutral-50 rounded-full flex items-center justify-center dark:bg-neutral-800"
        >
          <Icon
            icon="ri:checkbox-circle-line"
            class="size-10 text-neutral-300 dark:text-neutral-600"
          />
        </div>
        <div class="max-w-[200px]">
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">
            All Done
          </h2>
          <p class="text-neutral-400 leading-relaxed dark:text-neutral-500">
            No tasks for today, add some tasks below.
          </p>
        </div>
      </div>
      <div v-else class="p-4 space-y-1">
        <div
          v-for="(todo, index) of todos"
          :key="todo.id"
          :class="[
            'p-3 rounded-xl transition flex items-center justify-between gap-3 transition',
            todo.done ? 'bg-neutral-50/50 dark:bg-neutral-800/50' : '',
          ]"
        >
          <div class="flex items-center gap-3 grow">
            <label class="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="appearance-none w-5 h-5 border-2 border-neutral-300 rounded-full peer transition cursor-pointer checked:bg-neutral-300 dark:border-neutral-600 dark:checked:bg-neutral-600"
                v-model="todos[index].done"
              />
              <Icon
                icon="ri:check-fill"
                class="hidden absolute top-1 left-1 size-3 text-white peer-checked:block dark:text-neutral-900"
              />
            </label>
            <form
              v-if="editingIndex === index"
              id="editForm"
              class="grow"
              @submit.prevent="onSaveEdit"
            >
              <input
                ref="editInput"
                :class="[
                  'w-full border-b border-neutral-300 pb-0.5 text-[1.05rem] focus:outline-none dark:border-neutral-700',
                  todo.done
                    ? 'text-neutral-400 dark:text-neutral-600'
                    : 'text-neutral-700 dark:text-white',
                ]"
                required
                v-model="editValue"
                v-click-outside="onCloseEditing"
              />
            </form>
            <p
              v-else
              :class="[
                'font-medium',
                todo.done
                  ? 'text-neutral-400 line-through dark:text-neutral-600'
                  : 'text-neutral-700 dark:text-white',
              ]"
              @click="onOpenEditing(index)"
            >
              {{ todo.name }}
            </p>
          </div>
          <button
            v-if="editingIndex === index"
            ref="saveEditButton"
            class="cursor-pointer text-blue-500 dark:text-blue-400"
            type="submit"
            form="editForm"
          >
            <Icon icon="ri:check-fill" class="size-5" />
          </button>
          <button
            v-else
            class="cursor-pointer text-neutral-300 hover:text-red-500 dark:text-neutral-700 dark:hover:text-red-400"
            @click="onRemove(index)"
          >
            <Icon icon="ri:close-fill" class="size-5" />
          </button>
        </div>
      </div>
      <form
        class="p-6 border-t border-neutral-100 dark:border-neutral-800"
        @submit.prevent="onSave"
      >
        <input
          type="text"
          class="h-13 px-5 w-full border border-transparent rounded-2xl bg-neutral-50 transition placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-neutral-300 dark:bg-neutral-800 dark:placeholder:text-neutral-500 dark:focus:bg-neutral-800 dark:focus:border-neutral-600 dark:text-white"
          placeholder="Add new activities"
          required
          v-model="newTodo"
        />
      </form>
    </div>
  </div>
</template>
