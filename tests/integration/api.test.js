const request = require("supertest");
const app = require("../../src/index");

describe("Integration Test (API)", () => {
  test("GET /api/health returns UP", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "UP");
  });
});