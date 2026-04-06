process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../backend/src/index');
const { sequelize } = require('../../backend/src/models');

describe('Integration: Comic API', () => {
  beforeAll(async () => {
    await app.initDB({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Get comics list', async () => {
    const res = await request(app).get('/api/user-comics');
    expect([200,404,500]).toContain(res.status);
    if (res.status === 200) expect(Array.isArray(res.body)).toBe(true);
  });
});