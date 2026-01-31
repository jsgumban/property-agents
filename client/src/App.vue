<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AgentForm from './components/AgentForm.vue'
import { api } from './services/api'

const agents = ref<any[]>([])
const selectedAgent = ref<any>(null)
const message = ref('')
const error = ref('')

const showMessage = (msg: string) => {
  message.value = msg
  error.value = ''
  setTimeout(() => message.value = '', 3000)
}

const showError = (err: any) => {
  error.value = err.message || 'Something went wrong'
  message.value = ''
  setTimeout(() => error.value = '', 3000)
}

const loadAgents = async () => {
  try {
    const res = await api.getAgents()
    agents.value = res.data
  } catch (e) {
    showError(e)
  }
}

const handleSubmit = async (data: any) => {
  try {
    if (data.id) {
      await api.updateAgent(data.id, data)
      showMessage('Agent updated!')
    } else {
      await api.createAgent(data)
      showMessage('Agent created!')
    }
    selectedAgent.value = null
    loadAgents()
  } catch (e) {
    showError(e)
  }
}

const handleEdit = (agent: any) => {
  selectedAgent.value = agent
}

const handleCancel = () => {
  selectedAgent.value = null
}

const handleDelete = async (id: string) => {
  try {
    await api.deleteAgent(id)
    showMessage('Agent deleted!')
    loadAgents()
  } catch (e) {
    showError(e)
  }
}

onMounted(loadAgents)
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold mb-4">Property Agents</h1>

    <p v-if="message" class="text-green-600 mb-4">{{ message }}</p>
    <p v-if="error" class="text-red-600 mb-4">{{ error }}</p>

    <AgentForm :agent="selectedAgent" @submit="handleSubmit" @cancel="handleCancel" />

    <div class="mt-8">
      <h2 class="text-xl font-bold mb-2">Agents List</h2>
      <ul class="space-y-2">
        <li v-for="agent in agents" :key="agent.id" class="bg-white p-3 rounded shadow flex justify-between items-center">
          <span>{{ agent.firstName }} {{ agent.lastName }} - {{ agent.email }}</span>
          <div class="flex gap-2">
            <button @click="handleEdit(agent)" class="text-blue-500">Edit</button>
            <button @click="handleDelete(agent.id)" class="text-red-500">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
