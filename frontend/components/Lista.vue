<template>
    <div class="p-6 w-full flex justify-end">
      <div class="w-1/2">
        <div class="flex justify-center space-x-4 mb-6">
          <label><input type="checkbox" v-model="filters.todos" /> Todos</label>
          <label><input type="checkbox" v-model="filters.todo" /> A Fazer</label>
          <label><input type="checkbox" v-model="filters.doing" /> Fazendo</label>
          <label><input type="checkbox" v-model="filters.done" /> Concluído</label>
        </div>
  
        <div v-for="(todo, index) in filteredTodos" :key="index" class="p-4 mb-4 bg-white shadow rounded-lg flex justify-between items-center border-l-4" :class="todoBorderColor(todo.status)">
          <div>
            <h2 class="font-bold text-xl">{{ todo.title }}</h2>
            <p class="text-gray-500">{{ todo.category }}</p>
          </div>
          <div class="text-gray-500">{{ todo.createdAt }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filters: {
          todos: true,
          todo: false,
          doing: false,
          done: false,
        },
        todos: [
          {
            title: "Tarefa 1",
            category: "Categoria",
            createdAt: "2024-10-15",
            status: "todo",
          },
          {
            title: "Tarefa 2",
            category: "Categoria",
            createdAt: "2024-10-15",
            status: "doing",
          },
          {
            title: "Tarefa 3",
            category: "Categoria",
            createdAt: "2024-10-14",
            status: "done",
          },
        ],
      };
    },
    computed: {
      filteredTodos() {
        if (this.filters.todos) {
          return this.todos;
        }
        return this.todos.filter((todo) => {
          if (this.filters.todo && todo.status === "todo") return true;
          if (this.filters.doing && todo.status === "doing") return true;
          if (this.filters.done && todo.status === "done") return true;
          return false;
        });
      },
    },
    methods: {
      todoBorderColor(status) {
        if (status === "todo") return "border-red-500";
        if (status === "doing") return "border-orange-500"; 
        if (status === "done") return "border-green-500";   
        return "border-gray-300";
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  