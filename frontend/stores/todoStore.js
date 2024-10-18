import { defineStore } from 'pinia';
import { useFetch } from '#app';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todo: [],
    error: null,
  }),
  actions: {
    async fetchTodo() {
      try {
        const { data, error } = await useFetch('http://localhost:3000/api');
        this.todo = data.value; 
        this.error = error.value;
      } catch (err) {
        this.error = err.message;
      }
    },
    async addTodo(todo) {
      try {
        const { data, error } = await useFetch('http://localhost:3000/api', {
          method: 'POST',
          body: todo,
        });
        this.todo.push(data.value);
        this.error = error.value;
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateTodo(todoId, updatedTodo) {
      try {
        const { data, error } = await useFetch(`http://localhost:3000/api/${todoId}`, {
          method: 'PUT',
          body: updatedTodo,
        });
        const index = this.todo.findIndex(todo => todo._id === todoId);
        this.todo[index] = data.value;
        this.error = error.value;
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteTodo(todoId) {
      try {
        await useFetch(`http://localhost:3000/api/${todoId}`, {
          method: 'DELETE',
        });
        this.todo = this.todo.filter(todo => todo._id !== todoId);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});