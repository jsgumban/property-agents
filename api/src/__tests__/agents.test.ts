import request from 'supertest';
import app from '../index';

describe('Agents API', () => {
  let id: string;

  it('POST /api/agents', async () => {
    const res = await request(app).post('/api/agents').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      mobileNumber: '1234567890'
    });
    expect(res.status).toBe(201);
    id = res.body.id;
  });

  it('GET /api/agents', async () => {
    const res = await request(app).get('/api/agents');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('GET /api/agents/paginated', async () => {
    const res = await request(app).get('/api/agents/paginated?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('page');
  });

  it('GET /api/agents/:id', async () => {
    const res = await request(app).get(`/api/agents/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe('John');
  });

  it('PUT /api/agents/:id', async () => {
    const res = await request(app).put(`/api/agents/${id}`).send({ firstName: 'Jane' });
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe('Jane');
  });

  it('DELETE /api/agents/:id', async () => {
    const res = await request(app).delete(`/api/agents/${id}`);
    expect(res.status).toBe(204);
  });
});
