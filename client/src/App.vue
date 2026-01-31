<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AgentForm from './components/AgentForm.vue'
import AgentList from './components/AgentList.vue'
import { api } from './services/api'
import type { Agent } from './types/Agent'

const agents = ref<Agent[]>([])
const selectedAgent = ref<Agent | null>(null)
const message = ref('')
const error = ref('')
const loading = ref(false)

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
  loading.value = true
  try {
    const res = await api.getAgents()
    agents.value = res.data
  } catch (e) {
    showError(e)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (data: Agent) => {
  loading.value = true
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
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: string) => {
  loading.value = true
  try {
    await api.deleteAgent(id)
    showMessage('Agent deleted!')
    loadAgents()
  } catch (e) {
    showError(e)
  } finally {
    loading.value = false
  }
}

onMounted(loadAgents)
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold mb-4">Property Agents</h1>

    <p v-if="loading" class="text-gray-500 mb-4">Loading...</p>
    <p v-if="message" class="text-green-600 mb-4">{{ message }}</p>
    <p v-if="error" class="text-red-600 mb-4">{{ error }}</p>

    <AgentForm
      :agent="selectedAgent"
      @submit="handleSubmit"
      @cancel="selectedAgent = null"
    />

    <div class="mt-8">
      <AgentList
        :agents="agents"
        @edit="selectedAgent = $event"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
