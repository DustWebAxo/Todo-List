<template>
  <div
    :class="[
      'flex items-center flex-col xl:flex-row justify-between max-w-full',
      isDarkMode ? 'bg-[#313131]' : 'bg-white',
    ]"
  >
    <div
      class="flex flex-col items-center pt-8 xl:pt-4 w-9/12 lg:w-6/12 lg:pt-[4rem]"
    >
      <h2
        :class="[
          'text-[28px] font-bold mb-8 sm:text-3xl lg:text-[40px]',
          isDarkMode ? 'text-white' : 'text-black',
        ]"
      >
        Crie uma Task
      </h2>
      <form @submit.prevent="createTask" class="space-y-4">
        <input
          v-model="title"
          type="text"
          placeholder="Título da Task..."
          :class="[
            'w-full p-3 rounded-md focus:outline-none shadow-sm sm:text-lg lg:text-xl',
            isDarkMode ? 'bg-[#4b4b4b] text-white' : 'bg-gray-200 text-black',
          ]"
        />
        <textarea
          v-model="content"
          placeholder="Conteúdo da Task..."
          rows="4"
          :class="[
            'w-full min-h-[300px] resize-none overflow-y-auto p-3 rounded-md focus:outline-none shadow-sm sm:text-lg lg:text-xl',
            isDarkMode ? 'bg-[#4b4b4b] text-white' : 'bg-gray-200 text-black',
          ]"
        ></textarea>
        <div class="text-center">
          <button
            type="submit"
            :class="[
              'px-6 py-2 mt-2 rounded-md transition-all shadow-sm sm:text-lg lg:text-2xl',
              isDarkMode
                ? 'bg-[#4b4b4b] text-white hover:bg-[#777777]'
                : 'bg-[#2B2B2B] text-white hover:bg-[#595959]',
            ]"
          >
            Criar
          </button>
        </div>
      </form>
    </div>

    <div
      :class="[
        'xl:h-[39rem] xl:w-[5px] xl:rounded-lg xl:-translate-x-20 xl:mt-[8rem]',
        isDarkMode ? 'xl:bg-gray-400' : 'xl:bg-black',
      ]"
    ></div>

    <div
      class="flex flex-col items-center pt-8 w-12/12 mb-8 lg:w-6/12 lg:pt-[2rem]"
    >
      <div class="flex flex-col justify-between items-center mb-4">
        <h2
          :class="[
            'text-[28px] mb-8 font-bold sm:text-3xl lg:text-[40px] lg:mb-8',
            isDarkMode ? 'text-white' : 'text-black',
          ]"
        >
          Minhas tarefas
        </h2>
        <div class="flex justify-evenly gap-3 lg:gap-5 mb-4">
          <button
            @click="setFilter('Todos')"
            :class="[
              'text-[12px] sm:text-xl xl:text-xl py-1 lg:py-2 px-3 lg:px-4 sm:px-4 rounded-lg border-l-4 border-gray-500 transition-all shadow-sm',
              isDarkMode
                ? 'bg-[#4b4b4b] text-white hover:bg-[#777777]'
                : 'bg-[#2B2B2B] text-white hover:bg-[#595959]',
            ]"
          >
            Todas
          </button>
          <button
            @click="setFilter('A fazer')"
            :class="[
              'text-[12px] sm:text-xl xl:text-xl py-1 lg:py-2 px-3 lg:px-3 lg:w-[8vw] xl:w-[5vw] sm:px-4 rounded-lg border-l-4 border-red-500 transition-all shadow-sm',
              isDarkMode
                ? 'bg-[#4b4b4b] text-white hover:bg-[#777777]'
                : 'bg-[#2B2B2B] text-white hover:bg-[#595959]',
            ]"
          >
            A fazer
          </button>
          <button
            @click="setFilter('Fazendo')"
            :class="[
              'text-[12px] sm:text-xl xl:text-xl py-1 lg:py-2 px-3 lg:px-4 sm:px-4 rounded-lg border-l-4 border-yellow-500 transition-all shadow-sm',
              isDarkMode
                ? 'bg-[#4b4b4b] text-white hover:bg-[#777777]'
                : 'bg-[#2B2B2B] text-white hover:bg-[#595959]',
            ]"
          >
            Fazendo
          </button>
          <button
            @click="setFilter('Concluído')"
            :class="[
              'text-[12px] sm:text-xl xl:text-xl py-1 lg:py-2 px-3 lg:px-4 sm:px-4 rounded-lg border-l-4 border-green-500 transition-all shadow-sm',
              isDarkMode
                ? 'bg-[#4b4b4b] text-white hover:bg-[#777777]'
                : 'bg-[#2B2B2B] text-white hover:bg-[#595959]',
            ]"
          >
            Concluído
          </button>
        </div>
      </div>

      <ul
        :class="[
          'flex flex-col w-[80vw] xl:w-[45vw] gap-3 overflow-y-auto h-[600px] custom-scrollbar',
        ]"
      >
        <li
          v-for="task in filterTasks"
          :key="task._id"
          @click="openModal(task)"
          :class="{
            'border-l-red-500': task.status === 'A fazer',
            'border-l-yellow-500': task.status === 'Fazendo',
            'border-l-green-500': task.status === 'Concluído',
            'bg-[#4b4b4b]': isDarkMode,
            'bg-gray-200': !isDarkMode,
          }"
          class="p-4 rounded-lg border-l-[6px] cursor-pointer shadow-lg"
        >
          <div
            :class="[
              'flex justify-between border-b-2 pb-2',
              isDarkMode ? 'border-gray-500' : 'border-gray-400',
            ]"
          >
            <h1
              :class="[
                'text-lg font-bold xl:text-xl',
                isDarkMode ? 'text-white' : 'text-black',
              ]"
            >
              {{ task.title }}
            </h1>
            <span
              :class="[
                'text-md xl:text-lg font-bold',
                isDarkMode ? 'text-gray-300' : 'text-black',
              ]"
              >{{ new Date(task.createdAt).toLocaleDateString() }}</span
            >
          </div>
          <div
            :class="[
              'text-lg pt-4 xl:text-xl',
              isDarkMode ? 'text-gray-300' : 'text-black',
            ]"
          >
            {{ task.status }}
          </div>
        </li>
      </ul>
    </div>

    <div
      v-if="modalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-8 rounded-lg max-w-xl w-11/12">
        <h2 class="text-2xl font-bold mb-4">{{ selectedTask.title }}</h2>
        <input
          v-model="selectedTask.title"
          type="text"
          class="w-full text-sm sm:text-lg lg:text-xl p-3 bg-gray-200 rounded-md focus:outline-none mb-4"
        />
        <textarea
          v-model="selectedTask.description"
          class="w-full text-sm sm:text-lg lg:text-xl resize-none overflow-y-auto p-3 bg-gray-200 rounded-md focus:outline-none mb-4"
          rows="4"
        ></textarea>
        <select
          v-model="selectedTask.status"
          class="w-full text-sm sm:text-lg lg:text-xl p-3 bg-gray-200 rounded-md focus:outline-none mb-4 lg:mb-7"
        >
          <option value="A fazer">A fazer</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Concluído">Concluído</option>
        </select>
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-400 text-white px-2 sm:px-4 text-sm sm:text-lg lg:text-xl py-1 sm:py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            @click="deleteTask"
            class="bg-red-500 text-white px-2 sm:px-4 text-sm sm:text-lg lg:text-xl py-1 sm:py-2 rounded mr-2"
          >
            Deletar
          </button>
          <button
            @click="updateTask"
            class="bg-green-500 text-white px-2 sm:px-4 text-sm sm:text-lg lg:text-xl py-1 sm:py-2 rounded mr-2"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "../stores/todoStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useThemeStore } from "../stores/themeStore";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const title = ref("");
const content = ref("");
const filterActive = ref("Todos");
const modalVisible = ref(false);
const selectedTask = ref(null);
const themeStore = useThemeStore();
const { isDarkMode } = storeToRefs(themeStore);

onMounted(() => {
  taskStore.fetchTasks();
});

const filterTasks = computed(() => {
  if (filterActive.value === "Todos") {
    return taskStore.tasks;
  }
  return taskStore.tasks.filter((task) => task.status === filterActive.value);
});

const setFilter = (status) => {
  filterActive.value = status;
};

const createTask = async () => {
  if (!title.value) {
    toast("Digite o título!", {
      type: "warning",
      autoClose: 2000,
    });
    return;
  }
  if (!content.value) {
    toast("Digite o conteúdo!", {
      type: "warning",
      autoClose: 2000,
    });
    return;
  }

  await taskStore.addTask({
    title: title.value,
    description: content.value,
    status: "A fazer",
  });

  toast("Tarefa criada com sucesso!", {
    type: "success",
    autoClose: 2000,
  });

  title.value = "";
  content.value = "";
  await taskStore.fetchTasks();
};

const openModal = (task) => {
  selectedTask.value = { ...task };
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const updateTask = async () => {
  await taskStore.updateTask(selectedTask.value._id, selectedTask.value);
  closeModal();
  await taskStore.fetchTasks();

  toast("Tarefa atualizada!", {
    type: "success",
    autoClose: 2000,
  });
};

const deleteTask = async () => {
  await taskStore.deleteTask(selectedTask.value._id);
  closeModal();
  await taskStore.fetchTasks();

  toast("Tarefa deletada!", {
    type: "success",
    autoClose: 2000,
  });
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: none;
  scrollbar-color: #888 #f1f1f1;
}
</style>
