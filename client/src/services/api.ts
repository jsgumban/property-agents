import type { Agent } from '../types/Agent'

const API_URL = 'http://localhost:3000/api'

const handleResponse = async (res: Response) => {
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  getAgents: () =>
    fetch(`${API_URL}/agents`).then(handleResponse),

  createAgent: (data: Omit<Agent, 'id'>) =>
    fetch(`${API_URL}/agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),

  updateAgent: (id: string, data: Partial<Agent>) =>
    fetch(`${API_URL}/agents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),

  deleteAgent: (id: string) =>
    fetch(`${API_URL}/agents/${id}`, { method: 'DELETE' })
}
