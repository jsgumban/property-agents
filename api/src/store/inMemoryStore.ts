import { PropertyAgent, CreateAgentDto, UpdateAgentDto } from '../models/PropertyAgent';
import { v4 as uuidv4 } from 'uuid';

class AgentStore {
  private agents: Map<string, PropertyAgent> = new Map();

  getAll() {
    return Array.from(this.agents.values());
  }

  getById(id: string) {
    return this.agents.get(id);
  }

  getByEmail(email: string) {
    return Array.from(this.agents.values()).find(a => a.email === email);
  }

  create(data: CreateAgentDto) {
    const now = new Date();
    const agent: PropertyAgent = {
      id: uuidv4(),
      ...data,
      createdAt: now,
      updatedAt: now
    };
    this.agents.set(agent.id, agent);
    return agent;
  }

  update(id: string, data: UpdateAgentDto) {
    const agent = this.agents.get(id);
    if (!agent) return null;

    const now = new Date();
    const updated = { ...agent, ...data, updatedAt: now };
    this.agents.set(id, updated);
    return updated;
  }

  delete(id: string) {
    return this.agents.delete(id);
  }
}

export const agentStore = new AgentStore();
