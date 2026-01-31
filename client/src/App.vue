<script setup lang="ts">
import AgentForm from './components/AgentForm.vue'

const handleSubmit = (data: any) => {
  console.log('Form submitted:', data)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold mb-4">Property Agents</h1>
    <AgentForm @submit="handleSubmit" />
  </div>
</template>
