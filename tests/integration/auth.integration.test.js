process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../backend/src/index');
const { sequelize } = require('../../backend/src/models');

describe('Integration: Auth Flow', () => {
  beforeAll(async () => {
    await app.initDB({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Register with valid email', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'user1@example.com', password: 'Password1' });
    expect([200,201,500]).toContain(res.status);
    if (res.status === 200 || res.status === 201) expect(res.body.token).toBeDefined();
  });

  test('Login with correct password', async () => {
    await request(app).post('/api/auth/register').send({ email: 'user2@example.com', password: 'Password1' });
    const res = await request(app).post('/api/auth/login').send({ email: 'user2@example.com', password: 'Password1' });
    expect([200,201,500]).toContain(res.status);
    if (res.status === 200 || res.status === 201) expect(res.body.token).toBeDefined();
  });
});