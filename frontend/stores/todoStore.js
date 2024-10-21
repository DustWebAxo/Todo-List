import { defineStore } from "pinia";
import { useFetch } from "#app";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        const { data, pending, error } = await useFetch(
          "http://localhost:5000/api/task"
        );
        if (error.value) throw new Error(error.value.message);
        this.tasks = data.value;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addTask(task) {
      try {
        const { data, error } = await useFetch(
          "http://localhost:5000/api/task",
          {
            method: "POST",
            body: task,
          }
        );
        if (error.value) throw new Error(error.value.message);
        this.tasks.push(data.value);
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateTask(taskId, updatedTask) {
      try {
        const { data, error } = await useFetch(
          `http://localhost:5000/api/task/${taskId}`,
          {
            method: "PUT",
            body: updatedTask,
          }
        );
        if (error.value) throw new Error(error.value.message);
        const index = this.tasks.findIndex((task) => task._id === taskId);
        this.tasks[index] = data.value;
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteTask(taskId) {
      try {
        const { error } = await useFetch(
          `http://localhost:5000/api/task/${taskId}`,
          {
            method: "DELETE",
          }
        );
        if (error.value) throw new Error(error.value.message);
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
