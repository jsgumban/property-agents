import { Router } from 'express';
import { agentStore } from '../store/inMemoryStore';
import { validateAgent } from '../middleware/validation';

const router = Router();

// Get all agents
router.get('/', (req, res) => {
  const agents = agentStore.getAll();
  res.json({ data: agents });
});

// Get single agent
router.get('/:id', (req, res) => {
  const agent = agentStore.getById(req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
});

// Create agent
router.post('/', validateAgent, (req, res) => {
  const { firstName, lastName, email, mobileNumber } = req.body;

  const existing = agentStore.getByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const agent = agentStore.create({ firstName, lastName, email, mobileNumber });
  res.status(201).json(agent);
});

// Update agent
router.put('/:id', (req, res) => {
  const { firstName, lastName, email, mobileNumber } = req.body;

  if (email) {
    const existing = agentStore.getByEmail(email);
    if (existing && existing.id !== req.params.id) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  }

  const agent = agentStore.update(req.params.id, { firstName, lastName, email, mobileNumber });
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
});

// Delete agent
router.delete('/:id', (req, res) => {
  const deleted = agentStore.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.status(204).send();
});

export default router;
