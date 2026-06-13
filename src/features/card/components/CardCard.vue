<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseState from '../../../components/base/BaseState.vue';
import BaseCheckbox from '../../../components/base/BaseCheckbox.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { nextTick, reactive, ref, useTemplateRef } from 'vue';
import { supabase } from '../../../core/supabase';

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const tasks = ref([]);
const newTask = ref(null);
const editInput = useTemplateRef('editInput');
const saveEditButton = useTemplateRef('saveEditButton');
const editTask = reactive({
  index: null,
  name: null,
});

async function loadTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('card_id', props.card.id);

  if (!error) {
    tasks.value = data;
  }
}
async function onOpenEditing(index) {
  editTask.index = index;
  editTask.name = tasks.value[index].name;

  await nextTick();

  editInput.value[0].focus();
}
function onCloseEditing(e) {
  if (!saveEditButton.value[0].contains(e.target)) {
    editTask.index = null;
  }
}
async function onCreate() {
  const task = {
    id: Date.now(),
    name: newTask.value,
    done: false,
  };

  tasks.value.push(task);

  newTask.value = null;

  const { data, error } = await supabase
    .from('tasks')
    .insert({
      name: task.name,
      card_id: props.card.id,
    })
    .select();

  if (!error) {
    const newTaskIndex = tasks.value.findIndex(
      (createdTask) => createdTask.id === task.id,
    );

    tasks.value[newTaskIndex].id = data[0].id;
  }
}
async function onSaveEdit() {
  const newTaskName = editTask.name;
  const editingTask = tasks.value[editTask.index];

  tasks.value[editTask.index].name = newTaskName;
  editTask.index = null;

  await supabase
    .from('tasks')
    .update({ name: newTaskName })
    .eq('id', editingTask.id);
}
async function onRemove(task, index) {
  tasks.value.splice(index, 1);

  await supabase.from('tasks').delete().eq('id', task.id);
}

loadTasks();
</script>

<template>
  <BaseCard :title="card.name" with-divider>
    <BaseState
      v-if="!tasks.length"
      class="p-4 min-h-60"
      title="All Done"
      icon="ri:checkbox-circle-line"
      description="No tasks for today, add some tasks below."
    />
    <div v-else class="space-y-1">
      <div class="p-4">
        <div
          v-for="(task, index) of tasks"
          :key="task.id"
          :class="[
            'p-3 rounded-xl transition flex items-center justify-between gap-3 transition',
            task.done ? 'bg-neutral-50/50 dark:bg-neutral-800/50' : '',
          ]"
        >
          <div class="flex items-center gap-3 grow">
            <BaseCheckbox v-model="tasks[index].done" />
            <form
              v-if="editTask.index === index"
              id="editForm"
              class="grow"
              @submit.prevent="onSaveEdit"
            >
              <input
                ref="editInput"
                :class="[
                  'w-full border-b border-neutral-300 pb-0.5 text-[1.05rem] focus:outline-none dark:border-neutral-700',
                  task.done
                    ? 'text-neutral-400 dark:text-neutral-600'
                    : 'text-neutral-700 dark:text-white',
                ]"
                required
                v-model="editTask.name"
                v-click-outside="onCloseEditing"
              />
            </form>
            <p
              v-else
              :class="[
                'font-medium',
                task.done
                  ? 'text-neutral-400 line-through dark:text-neutral-600'
                  : 'text-neutral-700 dark:text-white',
              ]"
              @click="onOpenEditing(index)"
            >
              {{ task.name }}
            </p>
          </div>

          <button
            v-if="editTask.index === index"
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
            @click="onRemove(task, index)"
          >
            <Icon icon="ri:close-fill" class="size-5" />
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <form @submit.prevent="onCreate">
        <BaseInput
          placeholder="Add new activities"
          required
          v-model="newTask"
        />
      </form>
    </template>
  </BaseCard>
</template>
