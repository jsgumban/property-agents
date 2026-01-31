import { PropertyAgent, CreateAgentDto, UpdateAgentDto } from '../models/PropertyAgent';
import { v4 as uuidv4 } from 'uuid';

class AgentStore {
  private agents: Map<string, PropertyAgent> = new Map();

  getAll() {
    return Array.from(this.agents.values());
  }

  getById(id: string): PropertyAgent | undefined {
    return this.agents.get(id);
  }

  getByEmail(email: string): PropertyAgent | undefined {
    return Array.from(this.agents.values()).find(a => a.email === email);
  }

  create(dto: CreateAgentDto): PropertyAgent {
    const now = new Date();
    const agent: PropertyAgent = {
      id: uuidv4(),
      ...dto,
      createdAt: now,
      updatedAt: now
    };
    this.agents.set(agent.id, agent);
    return agent;
  }

  update(id: string, dto: UpdateAgentDto): PropertyAgent | null {
    const existing = this.agents.get(id);
    if (!existing) return null;

    const updated: PropertyAgent = {
      ...existing,
      ...dto,
      updatedAt: new Date()
    };
    this.agents.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.agents.delete(id);
  }
}

export const agentStore = new AgentStore();
