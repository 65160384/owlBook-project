process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../backend/src/index');
const { sequelize } = require('../../backend/src/models');

describe('Integration: User Profile', () => {
  beforeAll(async () => {
    await app.initDB({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Get user profile (unauthenticated)', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect([401,404]).toContain(res.status);
  });
});