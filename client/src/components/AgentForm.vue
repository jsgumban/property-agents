<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{ agent?: any }>()
const emit = defineEmits(['submit', 'cancel'])

const defaultForm = { id: '', firstName: '', lastName: '', email: '', mobileNumber: '' }
const form = reactive({ ...defaultForm })

watch(() => props.agent, (val) => {
  Object.assign(form, val || defaultForm)
}, { immediate: true })
</script>

<template>
  <form @submit.prevent="emit('submit', { ...form })" class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium">First Name</label>
      <input v-model="form.firstName" type="text" required class="mt-1 block w-full border rounded px-3 py-2" />
    </div>

    <div>
      <label class="block text-sm font-medium">Last Name</label>
      <input v-model="form.lastName" type="text" required class="mt-1 block w-full border rounded px-3 py-2" />
    </div>

    <div>
      <label class="block text-sm font-medium">Email</label>
      <input v-model="form.email" type="email" required class="mt-1 block w-full border rounded px-3 py-2" />
    </div>

    <div>
      <label class="block text-sm font-medium">Mobile Number</label>
      <input v-model="form.mobileNumber" type="text" required class="mt-1 block w-full border rounded px-3 py-2" />
    </div>

    <div class="flex gap-2">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ form.id ? 'Update' : 'Create' }}
      </button>
      <button v-if="form.id" type="button" @click="emit('cancel')" class="bg-gray-300 px-4 py-2 rounded">
        Cancel
      </button>
    </div>
  </form>
</template>
