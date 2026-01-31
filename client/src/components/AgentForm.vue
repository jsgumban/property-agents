<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits(['submit'])

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: ''
})

const onSubmit = () => {
  emit('submit', { ...form })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4 max-w-md">
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

    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
  </form>
</template>
