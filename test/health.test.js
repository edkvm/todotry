// auth.test.ts

const app = require("../app");
const faker = require("faker");
const supertest = require("supertest");
const models = require( "../server/models");

describe("test Health middleware", () => {
  let thisDb = models;

  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
  })

  it("should respond with status 200", async () => {
    // App is used with supertest to simulate server request
    const response = await supertest(app)
      .get("/api/_health")
      .expect(200)
      

    expect(response.body).toMatchObject({
      status: 'ok',
      code: 200,
    })
  })

  it("should create a new Board", async () => {
    let boardName = 'New Board'
    // App is used with supertest to simulate server request
    const response = await supertest(app)
      .post("/api/boards")
      .send({
        name: boardName,
       })
      .expect(201)
      

    expect(response.body).toMatchObject({
      name: boardName,
    })
  })

  afterAll(async () => {
    await thisDb.sequelize.close()
  })
})