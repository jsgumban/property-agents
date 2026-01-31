<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AgentForm from './components/AgentForm.vue'
import { api } from './services/api'

const agents = ref<any[]>([])
const message = ref('')

const loadAgents = async () => {
  const res = await api.getAgents()
  agents.value = res.data
}

const handleSubmit = async (data: any) => {
  await api.createAgent(data)
  message.value = 'Agent created!'
  loadAgents()
}

onMounted(loadAgents)
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold mb-4">Property Agents</h1>

    <p v-if="message" class="text-green-600 mb-4">{{ message }}</p>

    <AgentForm @submit="handleSubmit" />

    <div class="mt-8">
      <h2 class="text-xl font-bold mb-2">Agents List</h2>
      <ul class="space-y-2">
        <li v-for="agent in agents" :key="agent.id" class="bg-white p-3 rounded shadow">
          {{ agent.firstName }} {{ agent.lastName }} - {{ agent.email }}
        </li>
      </ul>
    </div>
  </div>
</template>
