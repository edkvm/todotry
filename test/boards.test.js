// auth.test.ts

const app = require("../app");
const faker = require("faker");
const supertest = require("supertest");
const models = require( "../server/models");

describe("test Board Creat/Update", () => {
  let thisDb = models;

  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
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