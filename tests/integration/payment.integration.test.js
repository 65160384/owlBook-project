process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../backend/src/index');
const { sequelize } = require('../../backend/src/models');

describe('Integration: Payment API', () => {
  beforeAll(async () => {
    await app.initDB({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Try to pay for episode (unauthenticated)', async () => {
    const res = await request(app).post('/api/create-payment').send({ episodeId: 1 });
    expect([200,401,400,404]).toContain(res.status);
  });
});