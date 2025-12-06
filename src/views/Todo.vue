<template>
  <h3>To-Do ⏳</h3>
  <form @submit.prevent="storeAndReset()"> 
    <input v-model="todo.text" type="text" name="text" placeholder="Masukkan tugas" />
    <input v-model="todo.dueDate" type="date" name="dueDate" style="margin-left: 8px;" /> 
    <button :disabled="!todo.text" type="submit" style="margin: 0 8px;">Add</button>
  </form>
  <div>
    <ul>
      <li v-for="pendingTodo in pendingTodos" :key="pendingTodo.id" style="margin: 8px 0">
        <span v-if="pendingTodo.dueDate" :class="{ 'due-soon': isDueSoon(pendingTodo.dueDate) }" style="margin-right: 8px; font-size: small;">
            ({{ formatDate(pendingTodo.dueDate) }})
        </span>
        <span style="margin: 0 8px;">{{ pendingTodo.text }}</span>
        
        <button @click="updateTodo({ ...pendingTodo, isCompleted: true})" style="margin: 0 4px;">✅</button>
        <button @click="destroyTodo(pendingTodo.id)">❌</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTodos } from '@/stores/todos';

export default {
  data: () => ({
    todo: {
      id: null,
      text: null,
      isCompleted: false,
      dueDate: null 
    }
  }),
  computed: {
    ...mapState(useTodos, [
      'pendingTodos', 
      'completedTodos'
    ])
  },
  methods: {
    ...mapActions(useTodos, [
      'storeTodo', 
      'updateTodo',
      'destroyTodo'
    ]),
    // Fungsi untuk memanggil storeTodo dan mereset form
    storeAndReset() {
      // Panggil action storeTodo dengan data form saat ini
      this.storeTodo(this.todo);

      // Reset data form setelah disimpan
      this.todo = {
        id: null,
        text: null,
        isCompleted: false,
        dueDate: null
      };
    },
    // Fungsi untuk memformat tampilan tanggal (opsional)
    formatDate(dateString) {
        if (!dateString) return '';
        // Format YYYY-MM-DD menjadi DD/MM/YYYY
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    },
    // Fungsi untuk menandai tugas yang akan jatuh tempo dalam 3 hari (opsional)
    isDueSoon(dateString) {
        if (!dateString) return false;
        const today = new Date();
        const dueDate = new Date(dateString);
        
        // Atur waktu ke tengah malam agar perbandingan lebih mudah
        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Tanda Merah jika <= 3 hari, dan belum terlambat (tanggalnya harus hari ini atau di masa depan)
        return diffDays >= 0 && diffDays <= 3; 
    }
  }
}
</script>