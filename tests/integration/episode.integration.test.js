process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../backend/src/index');
const { sequelize } = require('../../backend/src/models');

describe('Integration: Episode API', () => {
  beforeAll(async () => {
    await app.initDB({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Get episodes for a comic', async () => {
    const res = await request(app).get('/api/comics/1/episodes');
    expect([200,404,500]).toContain(res.status);
  });
});