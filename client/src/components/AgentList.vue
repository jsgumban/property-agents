<script setup lang="ts">
  import type { Agent } from '../types/Agent'

  defineProps<{ agents: Agent[] }>()
  const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-2">Agents List</h2>
    <ul class="space-y-2">
      <li v-for="agent in agents" :key="agent.id" class="bg-white p-3 rounded shadow flex justify-between items-center">
        <span>{{ agent.firstName }} {{ agent.lastName }} - {{ agent.email }}</span>
        <div class="flex gap-2">
          <button @click="emit('edit', agent)" class="text-blue-500">Edit</button>
          <button @click="emit('delete', agent.id)" class="text-red-500">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>
