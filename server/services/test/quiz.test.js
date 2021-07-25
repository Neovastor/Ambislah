const app = require("../app");
const request = require("supertest");

// const { quizzes } = require("../model/quizModel");

// let dataQuiz = require("./quiz.json");
let dataQuiz = {
  userId: 1,
  title: "quiz1",
  questions: [
    {
      type: "text",
      question: "penemu bola lampu ?",
      image: "null",
      choose: ["aku", "kamu", "dia", "mereka"],
      answer: "aku",
    },
  ],
  timer: 20,
  mode: "live",
  createdAt: new Date()
};

const { connect } = require("../config/mongodb");

let connection;
let client;
let db;
let id;
beforeAll(async () => {
  connection = await connect();
  client = connection.client;
  db = connection.database;
  const quiz = await db.collection("Quizzes").insertOne(dataQuiz);
  id = quiz.insertedId;
  return connection;
});

afterAll(async () => {
  await db.collection("Quizzes").remove({});
  await client.close();
});

jest.setTimeout(5000);
describe("Test Quizzes [SUCCESS CASE]", () => {
  it("test get all Quizzes", (done) => {
    request(app)
      .get("/quizzes")
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(200);

          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                _id: expect.any(String),
                userId: expect.any(Number),
                timer: expect.any(Number),
                mode: expect.any(String),
                questions: expect.arrayContaining([
                  expect.objectContaining({
                    type: expect.any(String),
                    question: expect.any(String),
                    image: expect.any(String),
                    answer: expect.any(String),
                    choose: expect.arrayContaining([expect.any(String)]),
                  }),
                ]),
              }),
            ])
          );

          done();
        }
      });
  });

  it("Test get by id Quiz ", (done) => {
    request(app)
      .get(`/quizzes/${id}`)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              userId: expect.any(Number),
              timer: expect.any(Number),
              mode: expect.any(String),
              questions: expect.arrayContaining([
                expect.objectContaining({
                  type: expect.any(String),
                  question: expect.any(String),
                  image: expect.any(String),
                  answer: expect.any(String),
                  choose: expect.arrayContaining([expect.any(String)]),
                }),
              ]),
            })
          );

          done();
        }
      });
  });

  it("Test create Quiz", (done) => {
    request(app)
      .post(`/quizzes`)
      .send({
        userId: 1,
        questions: [
          {
            type: "text",
            question: "siap presiden pertama indonesia ?",
            image: "null",
            choose: ["Soekarno", "Soeharto", "SBY", "Jokowi"],
            answer: "Soekarno",
          },
        ],
        timer: 20,
        mode: "challenge",
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(201);

          expect(res.body).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              userId: expect.any(Number),
              timer: expect.any(Number),
              mode: expect.any(String),
              questions: expect.arrayContaining([
                expect.objectContaining({
                  type: expect.any(String),
                  question: expect.any(String),
                  image: expect.any(String),
                  answer: expect.any(String),
                  choose: expect.arrayContaining([expect.any(String)]),
                }),
              ]),
            })
          );

          done();
        }
      });
  });

  it("Test update Quiz", (done) => {
    request(app)
      .put(`/quizzes/${id}`)
      .send({
        userId: 1,
        questions: [
          {
            type: "text",
            question: "siap presiden pertama indonesia ?",
            image: "null",
            choose: ["Soekarno", "Soeharto", "SBY", "Jokowi"],
            answer: "Soekarno",
          },
        ],
        timer: 20,
        mode: "challenge",
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(200);

          expect(res.body).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              userId: expect.any(Number),
              timer: expect.any(Number),
              mode: expect.any(String),
              matchedCount: expect.any(Number),
              questions: expect.arrayContaining([
                expect.objectContaining({
                  type: expect.any(String),
                  question: expect.any(String),
                  image: expect.any(String),
                  answer: expect.any(String),
                  choose: expect.arrayContaining([expect.any(String)]),
                }),
              ]),
            })
          );

          done();
        }
      });
  });

  it("Test delete Quiz by id  ", (done) => {
    request(app)
      .delete(`/quizzes/${id}`)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(200);

          expect(res.body).toEqual(
            expect.objectContaining({
              message: expect.any(String),
            })
          );

          done();
        }
      });
  });
});

describe("Test Quizzes [ERROR CASE]", () => {
  it("test get quiz by id, id should be 24 hex characters", (done) => {
    request(app)
      .get(`/quizzes/123123`)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 400,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  });

  it("test get quiz by id, id not found", (done) => {
    request(app)
      .get(`/quizzes/123123123123123123123123`)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(404);
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 404,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  });

  it("test post quiz, empty input", (done) => {
    request(app)
      .post(`/quizzes`)
      .send({
        userId: "",
        questions: [],
        timer: "",
        mode: "",
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 400,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  });

  it("test update quiz, id should be 24 hex characters", (done) => {
    request(app)
      .put(`/quizzes/123`)
      .send({
        userId: 1,
        questions: [
          {
            type: "text",
            question: "siap presiden pertama indonesia ?",
            image: "null",
            choose: ["Soekarno", "Soeharto", "SBY", "Jokowi"],
            answer: "Soekarno",
          },
        ],
        timer: 20,
        mode: "challenge",
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(400);

          expect(res.body).toEqual(
            expect.objectContaining({
              code: 400,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  });


  it("test update quiz, quiz not found", (done) => {
    request(app)
      .put(`/quizzes/123123123123123123123123`)
      .send({
        userId: 1,
        questions: [
          {
            type: "text",
            question: "siap presiden pertama indonesia ?",
            image: "null",
            choose: ["Soekarno", "Soeharto", "SBY", "Jokowi"],
            answer: "Soekarno",
          },
        ],
        timer: 20,
        mode: "challenge",
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(404);

          expect(res.body).toEqual(
            expect.objectContaining({
              code: 404,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  });

  it("test update quiz, empty input", (done) => {
    request(app)
      .put(`/quizzes/${id}`)
      .send({
        userId: "",
        questions: [
          {
            type: "text",
            question: "siap presiden pertama indonesia ?",
            image: "null",
            choose: ["Soekarno", "Soeharto", "SBY", "Jokowi"],
            answer: "Soekarno",
          },
        ],
        timer: "",
        mode: "",
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(400);

          expect(res.body).toEqual(
            expect.objectContaining({
              code: 400,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  });

  it("test delete quiz, id should be 24 hex characters", (done) => {
    request(app)
      .delete(`/quizzes/123`)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(400);

          expect(res.body).toEqual(
            expect.objectContaining({
              code: 400,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  });

  it("test delete quiz, quiz not found", (done) => {
    request(app)
      .delete(`/quizzes/123123123123123123123123`)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(404);

          expect(res.body).toEqual(
            expect.objectContaining({
              code: 404,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  });

});
