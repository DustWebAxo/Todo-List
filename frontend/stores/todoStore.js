import { defineStore } from "pinia";

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
        const response = await fetch("http://localhost:5000/api/task");
        const fetchedTasks = await response.json();

        if (!response.ok)
          throw new Error(fetchedTasks.message || "Failed to fetch tasks");

        this.tasks = fetchedTasks;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addTask(task) {
      try {
        const response = await fetch("http://localhost:5000/api/task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        const newTask = await response.json();

        if (!response.ok)
          throw new Error(newTask.message || "Failed to add task");

        this.tasks.push(newTask);
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateTask(taskId, updatedTask) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/task/${taskId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
          }
        );
        const updatedTaskData = await response.json();

        if (!response.ok)
          throw new Error(updatedTaskData.message || "Failed to update task");

        const index = this.tasks.findIndex((task) => task._id === taskId);
        if (index !== -1) {
          this.tasks[index] = updatedTaskData;
        }
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteTask(taskId) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/task/${taskId}`,
          {
            method: "DELETE",
          }
        );
        const result = await response.json();

        if (!response.ok)
          throw new Error(result.message || "Failed to delete task");

        this.tasks = this.tasks.filter((task) => task._id !== taskId);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
