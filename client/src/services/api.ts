const API_URL = 'http://localhost:3000/api'

export const api = {
  getAgents: () =>
    fetch(`${API_URL}/agents`).then(res => res.json()),

  createAgent: (data: any) =>
    fetch(`${API_URL}/agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  updateAgent: (id: string, data: any) =>
    fetch(`${API_URL}/agents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  deleteAgent: (id: string) =>
    fetch(`${API_URL}/agents/${id}`, { method: 'DELETE' })
}
