// folder store/todos.js

import { defineStore } from "pinia"

export const useTodos = defineStore('useTodos', {
  state: () => ({
    nextId: 0,
    todos: [],
  }),
  getters: {
    pendingTodos: (state) => {
      // Tambahkan pengurutan di sini agar tugas dengan Due Date terdekat muncul di atas
      return state.todos.filter(todo => !todo.isCompleted)
        .sort((a, b) => {
          // Konversi string tanggal ke objek Date untuk perbandingan
          const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          return dateA - dateB;
        });
    },
    completedTodos: (state) => {
      return state.todos.filter(todo => todo.isCompleted)
    }
  },
  actions: {
    // Pastikan payload juga menerima dueDate
    storeTodo(payload) {
      this.todos.push({ 
        id: this.nextId++, 
        text: payload.text, 
        isCompleted: false,
        // Properti baru
        dueDate: payload.dueDate || null 
      })
    },
    updateTodo(payload) {
      const index = this.todos.findIndex(item => item.id == payload.id)
      if (index != -1) {
        // Pastikan dueDate disertakan dalam update
        this.todos[index] = { 
            ...this.todos[index], 
            text: payload.text, 
            isCompleted: payload.isCompleted, 
            dueDate: payload.dueDate || null // Pastikan dueDate ada
        }
      }
    },
    destroyTodo(id) {
      const index = this.todos.findIndex(item => item.id == id)

      if (index > -1 && index < this.todos.length) {
        this.todos.splice(index, 1)
      }
    }
  },
})