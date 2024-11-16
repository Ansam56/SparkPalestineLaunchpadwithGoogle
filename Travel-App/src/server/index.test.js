const request = require("supertest");
let server;

beforeAll(() => {
  process.env.PORT = 8001; // Set a different port for testing
  server = require("./index");
});

afterAll((done) => {
  server.close(done);
});

describe("GET /", () => {
  it("should respond with the index.html file", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe("text/html; charset=UTF-8");
  });
});
