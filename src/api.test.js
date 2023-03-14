const { describe, it, after, before } = require("mocha");
const assert = require("assert");
const supertest = require("supertest");

describe("API Suite Test", () => {
  let app;

  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => {
    app.close(done);
  });

  describe("/contact:get", () => {
    it("should request the contact route and return HTTP Status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "contact us page");
    });
  });

  describe("/login:post", () => {
    it("should request the login route and return HTTP Status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "john_doe", password: "123" })
        .expect(200);

      assert.strictEqual(response.text, "login succeeded!");
    });

    it("should request the login route and return HTTP Status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "joe_doe", password: "123" })
        .expect(401);

      assert.strictEqual(response.text, "login failed!");
    });
  });

  describe("/hi:get - 404", () => {
    it("should request an unexisting route and return HTTP Status 404", async () => {
      const response = await supertest(app).post("/hi").expect(404);

      assert.strictEqual(response.text, "not found");
    });
  });
});
