<template>
  <div class="flex justify-between max-w-[1800px] mx-auto">
    <div class="flex flex-col items-center pt-8 w-8/12 lg:w-6/12 lg:pt-[8rem]">
      <h2 class="text-2xl font-bold mb-5 sm:text-3xl lg:text-4xl">
        Crie uma Task
      </h2>
      <form @submit.prevent="createTask" class="space-y-4">
        <input
          v-model="title"
          type="text"
          placeholder="Título da Task..."
          class="w-full p-3 bg-gray-200 rounded-md focus:outline-none shadow-sm md:text-lg lg:text-xl"
        />
        <textarea
          v-model="content"
          placeholder="Conteúdo da Task..."
          rows="4"
          class="w-full min-h-[300px] resize-none overflow-y-auto p-3 bg-gray-200 rounded-md focus:outline-none shadow-sm md:text-lg lg:text-xl"
        ></textarea>
        <div class="text-center">
          <button
            type="submit"
            class="bg-[#2B2B2B] text-white px-6 py-2 mt-4 rounded-md hover:bg-[#595959] transition-all shadow-sm md:text-lg lg:text-xl"
          >
            Criar
          </button>
        </div>
      </form>
    </div>

    <div class="h-[39rem] w-[5px] bg-black rounded-lg -translate-x-20 lg:mt-[8rem]"></div>

    <div class="flex flex-col pt-8 w-8/12 lg:w-6/12 lg:pt-[6rem]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold sm:text-3xl lg:text-4xl">
          Minhas tarefas
        </h2>
        <div class="flex gap-2">
          <button
            @click="setFilter('Todos')"
            class="py-1 px-3 bg-[#2B2B2B] rounded-lg text-white border-l-4 border-gray-500 hover:bg-[#595959] transition-all shadow-sm"
          >
            Todas
          </button>
          <button
            @click="setFilter('A fazer')"
            class="py-1 px-3 bg-[#2B2B2B] rounded-lg text-white border-l-4 border-red-500 hover:bg-[#595959] transition-all shadow-sm"
          >
            A fazer
          </button>
          <button
            @click="setFilter('Fazendo')"
            class="py-1 px-3 bg-[#2B2B2B] rounded-lg text-white border-l-4 border-yellow-500 hover:bg-[#595959] transition-all shadow-sm"
          >
            Fazendo
          </button>
          <button
            @click="setFilter('Concluído')"
            class="py-1 px-3 bg-[#2B2B2B] rounded-lg text-white border-l-4 border-green-500 hover:bg-[#595959] transition-all shadow-sm"
          >
            Concluído
          </button>

        </div>
      </div>

      <ul
        class="flex flex-col gap-3 overflow-y-auto h-[600px] custom-scrollbar"
      >
        <li
          v-for="task in filterTasks"
          :key="task._id"
          @click="openModal(task)"
          :class="{
            'border-l-red-500': task.status === 'A fazer',
            'border-l-yellow-500': task.status === 'Fazendo',
            'border-l-green-500': task.status === 'Concluído',
          }"
          class="bg-gray-200 p-4 rounded-lg border-l-[6px] cursor-pointer shadow-lg"
        >
          <div
            class="flex justify-between items-center border-b-2 border-gray-400 pb-2"
          >
            <h1 class="text-3xl font-bold">{{ task.title }}</h1>
            <span class="text-xl font-bold">{{
              new Date(task.createdAt).toLocaleDateString()
            }}</span>
          </div>
          <div class="text-2xl pt-4">{{ task.status }}</div>
        </li>
      </ul>
    </div>

    <div
      v-if="modalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-8 rounded-lg max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">{{ selectedTask.title }}</h2>
        <input
          v-model="selectedTask.title"
          type="text"
          class="w-full p-3 bg-gray-200 rounded-md focus:outline-none mb-4"
        />
        <textarea
          v-model="selectedTask.description"
          class="w-full resize-none overflow-y-auto p-3 bg-gray-200 rounded-md focus:outline-none mb-4"
          rows="4"
        ></textarea>
        <select
          v-model="selectedTask.status"
          class="w-full p-3 bg-gray-200 rounded-md focus:outline-none mb-4"
        >
          <option value="A fazer">A fazer</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Concluído">Concluído</option>
        </select>
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-400 text-white px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            @click="deleteTask"
            class="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Deletar
          </button>
          <button
            @click="updateTask"
            class="bg-green-500 text-white px-4 py-2 rounded"
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
import { useTaskStore } from "@/frontend/stores/todoStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const taskStore = useTaskStore();
const title = ref("");
const content = ref("");
const filterActive = ref("Todos");
const modalVisible = ref(false);
const selectedTask = ref(null);

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
  await taskStore.updateTask(
    selectedTask.value._id,
    selectedTask.value
  );
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
