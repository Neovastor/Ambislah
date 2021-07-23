const app = require("../app");
const request = require("supertest");
// const { quizzes } = require("../model/quizModel");
// let dataQuiz = require("./quiz.json");
const { connect } = require("../config/mongodb");

let connection;
let client;
let db;

beforeAll(async () => {
  connection = await connect();
  client = connection.client;
  db = connection.db;
  return connection;
});

afterAll(async () => {
  await client.close();
});

jest.setTimeout(10000);
describe("Get all Quizzes [SUCCESS CASE]", () => {
  it("Quizzes plain", (done) => {
    request(app)
      .get("/quizzes")
      .end((err, res) => {

        if (err) done(err);
        else {
          console.log("OK");
          expect(res.status).toBe(200);

          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                _id: expect.any(String),
                userId: expect.any(Number),
                timer: expect.any(Number),
                mode: expect.any(String),
                // questions: expect.any(Number),
              }),
            ])
          );

          done();
        }
      });
  });
});

