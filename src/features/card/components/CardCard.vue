<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseState from '../../../components/base/BaseState.vue';
import BaseCheckbox from '../../../components/base/BaseCheckbox.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { nextTick, reactive, ref, useTemplateRef } from 'vue';
import { supabase } from '../../../core/supabase';
import BaseInlineInput from '../../../components/base/BaseInlineInput.vue';
import BaseIconButton from '../../../components/base/BaseIconButton.vue';
import BaseDropdownItem from '../../../components/base/BaseDropdownItem.vue';
import BaseButton from '../../../components/base/BaseButton.vue';

defineEmits(['delete']);
const card = defineModel();

const tasks = ref([]);
const newTask = ref(null);
const editTaskInput = useTemplateRef('editTaskInput');
const editCardInput = useTemplateRef('editCardInput');
const saveEditButton = useTemplateRef('saveEditButton');
const editCard = reactive({
  active: false,
  name: null,
});
const editTask = reactive({
  index: null,
  name: null,
});

async function loadDailyClearTasks() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('card_id', card.value.id)
    .or(`done.eq.false,done_at.gte.${startOfToday.toISOString()}`)
    .order('id', { ascending: true });

  if (!error) {
    tasks.value = data;
  }
}
async function loadTasks() {
  if (card.value.clear_daily_done) {
    loadDailyClearTasks();
  } else {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('card_id', card.value.id)
      .order('id', { ascending: true });

    if (!error) {
      tasks.value = data;
    }
  }
}
async function onOpenEditCard() {
  editCard.active = true;
  editCard.name = card.value.name;

  await nextTick();

  editCardInput.value.input.focus();
}
async function onOpenEditTask(index) {
  editTask.index = index;
  editTask.name = tasks.value[index].name;

  await nextTick();

  editTaskInput.value[0].input.focus();
}
function onCloseEditTask(e) {
  if (!saveEditButton.value[0].contains(e.target)) {
    editTask.index = null;
  }
}
function onCloseEditCard() {
  // if (!saveEditButton.value[0].contains(e.target)) {
  editCard.active = null;
  // }
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
      card_id: card.value.id,
    })
    .select();

  if (!error) {
    const newTaskIndex = tasks.value.findIndex(
      (createdTask) => createdTask.id === task.id,
    );

    tasks.value[newTaskIndex].id = data[0].id;
  }
}
async function onSaveEditCard() {
  const newCardname = editCard.name;

  card.value.name = newCardname;

  editCard.active = false;

  await supabase
    .from('cards')
    .update({ name: newCardname })
    .eq('id', card.value.id);
}
async function onSaveEditTask() {
  const newTaskName = editTask.name;
  const editingTask = tasks.value[editTask.index];

  tasks.value[editTask.index].name = newTaskName;
  editTask.index = null;

  await supabase
    .from('tasks')
    .update({ name: newTaskName })
    .eq('id', editingTask.id);
}
async function onRemoveTask(task, index) {
  tasks.value.splice(index, 1);

  await supabase.from('tasks').delete().eq('id', task.id);
}
async function onChangeDone(task) {
  await supabase.from('tasks').update({ done: task.done }).eq('id', task.id);
}
async function onChangeCardClearDailyDone() {
  await supabase
    .from('cards')
    .update({ clear_daily_done: card.value.clear_daily_done })
    .eq('id', card.value.id);
}

if (!card.value.wasCreated) {
  loadTasks();
}
</script>

<template>
  <BaseCard with-header with-divider>
    <template #header>
      <form
        v-if="editCard.active"
        class="flex items-center gap-3"
        @submit.prevent="onSaveEditCard"
        v-click-outside="onCloseEditCard"
      >
        <BaseInlineInput
          ref="editCardInput"
          class="text-neutral-700 dark:text-white"
          v-model="editCard.name"
        />
        <button
          class="cursor-pointer text-blue-500 dark:text-blue-400"
          type="submit"
        >
          <Icon icon="ri:check-fill" class="size-5" />
        </button>
      </form>
      <div v-else class="flex items-center justify-between">
        <h2 class="font-bold text-2xl tracking-tight" @click="onOpenEditCard">
          {{ card.name }}
        </h2>

        <VDropdown placement="bottom-end">
          <button
            class="cursor-pointer text-neutral-300 hover:text-red-500 dark:text-neutral-700 dark:hover:text-red-400"
          >
            <Icon icon="ri:more-fill" class="size-5" />
          </button>
          <template #popper>
            <div class="p-1.5">
              <BaseDropdownItem :hover="false">
                <BaseCheckbox
                  v-model="card.clear_daily_done"
                  @change="onChangeCardClearDailyDone"
                >
                  <p>Reset Harian yang selesai</p>
                </BaseCheckbox>
              </BaseDropdownItem>
              <VDropdown placement="bottom-end">
                <BaseDropdownItem class="flex items-center gap-3">
                  <Icon
                    icon="ri:delete-bin-fill"
                    class="size-5 text-neutral-600"
                  />
                  Hapus
                </BaseDropdownItem>

                <template #popper>
                  <div class="p-1.5">
                    <BaseDropdownItem class="space-y-2" :hover="false">
                      <p>Semua task akan ikut terhapus, lanjutkan?</p>
                      <div class="flex gap-1 justify-end">
                        <BaseButton
                          color="ghost"
                          class="dark:hover:bg-neutral-800"
                          size="xs"
                          dark-surface="dark"
                          :fullwidth="false"
                          v-close-popper
                          >Batal</BaseButton
                        >
                        <BaseButton
                          color="ghost"
                          class="dark:hover:bg-neutral-800"
                          size="xs"
                          dark-surface="dark"
                          :fullwidth="false"
                          @click="$emit('delete')"
                          >Hapus</BaseButton
                        >
                      </div>
                    </BaseDropdownItem>
                  </div>
                </template>
              </VDropdown>
            </div>
          </template>
        </VDropdown>
      </div>
    </template>
    <BaseState
      v-if="!tasks.length"
      class="p-4 min-h-60"
      title="All Done"
      icon="ri:checkbox-circle-line"
      description="No tasks for today, add some tasks below."
    />
    <div v-else class="p-4 space-y-1">
      <div
        v-for="(task, index) of tasks"
        :key="task.id"
        :class="[
          'p-3 rounded-xl transition flex items-center justify-between gap-3 transition',
          task.done ? 'bg-neutral-50/50 dark:bg-neutral-800/50' : '',
        ]"
      >
        <div class="flex items-center gap-3 grow">
          <BaseCheckbox
            v-model="tasks[index].done"
            @change="onChangeDone(task)"
          />
          <form
            v-if="editTask.index === index"
            id="editForm"
            class="grow"
            @submit.prevent="onSaveEditTask"
          >
            <BaseInlineInput
              ref="editTaskInput"
              :class="[
                task.done
                  ? 'text-neutral-400 dark:text-neutral-600'
                  : 'text-neutral-700 dark:text-white',
              ]"
              required
              v-model="editTask.name"
              v-click-outside="onCloseEditTask"
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
            @click="onOpenEditTask(index)"
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
          @click="onRemoveTask(task, index)"
        >
          <Icon icon="ri:close-fill" class="size-5" />
        </button>
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
