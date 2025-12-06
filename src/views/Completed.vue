<template>
    <h3>Completed ✅</h3>
    <div>
      <ul>
        <li v-for="completedTodo in completedTodos" :key="completedTodo.id" style="margin: 8px 0">
          <span v-if="completedTodo.dueDate" style="margin-right: 8px; font-size: small; color: grey;">
              ({{ formatDate(completedTodo.dueDate) }})
          </span>
          {{ completedTodo.text }}
        </li>
      </ul>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useTodos } from '@/stores/todos';

import HeaderBar from '@/components/Header.vue';
import FooterBar from '@/components/Footer.vue';

export default {
  components: {
    HeaderBar,
    FooterBar,
  },
  computed: {
    ...mapState(useTodos, [
      'completedTodos'
    ])
  },
  methods: {
    // Fungsi untuk memformat tampilan tanggal
    formatDate(dateString) {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    },
  }
}
</script>