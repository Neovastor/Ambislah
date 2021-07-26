const { connect } = require("../config/mongodb");
const app = require("../app");
const request = require("supertest");
const { dummyReports, isValidDate } = require("./testing.helpers");

// const {signJWT, verifyJWT} = require('../helpers/jwt')
// require('dotenv').config()
let db = null;
let client = null;
let connection = null;

const reportData = {
  quizId: "1021efg",
  quizTitle: "Quiz baru",
  players: [{ name: "ba", score: 80 }],
};

beforeAll(async () => {
  if (process.env.NODE_ENV == "test") {
    connection = await connect();
    client = connection.client;
    db = connection.database;

    const reports = await db.collection("Reports");
    await reports.insertMany(dummyReports());

    return connection;
  }
});

afterAll(async () => {
  if (process.env.NODE_ENV == "test") {
    const reports = await db.collection("Reports");
    await reports.deleteMany({});

    await client.close();
  }
});

jest.setTimeout(5000);

describe("Reports [SUCCESS CASE]", () => {
  it("Get all reports", (done) => {
    request(app)
      .get("/reports")
      .set({ access_token: process.env.ACCESS_TOKEN })
      .end((err, res) => {
        if (err) done(err);
        else {
          const reportsArray = res.body;
          // console.log(reportsArray);
          expect(res.status).toBe(200);

          reportsArray.forEach((report) => {
            expect(isValidDate(report.createdAt)).toBe(true);
            expect(report).toHaveProperty("_id", expect.any(String));
            expect(report).toHaveProperty("userId", expect.any(String));
            expect(report).toHaveProperty("quizId", expect.any(String));
            expect(report).toHaveProperty("playersCount", expect.any(Number));
            expect(report).toHaveProperty("players", expect.any(Array));
            report.players.forEach((player) => {
              expect(player).toHaveProperty("name", expect.any(String));
              expect(player).toHaveProperty("score", expect.any(Number));
            });
          });

          done();
        }
      });
  });
  it("Get report by Id (60fad998cbd8d3ed1ba95f71)", (done) => {
    request(app)
      .get("/reports/60fad998cbd8d3ed1ba95f71")
      .set({ access_token: process.env.ACCESS_TOKEN })
      .end((err, res) => {
        if (err) done(err);
        else {
          const report = res.body;
          expect(res.status).toBe(200);
          expect(isValidDate(report.createdAt)).toBe(true);
          expect(report._id).toBe("60fad998cbd8d3ed1ba95f71");
          expect(report).toHaveProperty("userId", expect.any(String));
          expect(report).toHaveProperty("quizId", expect.any(String));
          expect(report).toHaveProperty("playersCount", expect.any(Number));
          expect(report).toHaveProperty("players", expect.any(Array));
          report.players.forEach((player) => {
            expect(player).toHaveProperty("name", expect.any(String));
            expect(player).toHaveProperty("score", expect.any(Number));
          });

          done();
        }
      });
  }),
    it("Create new report", (done) => {
      request(app)
        .post("/reports")
        .send(reportData)
        .set({ access_token: process.env.ACCESS_TOKEN })
        .end((err, res) => {
          if (err) done(err);
          else {
            const report = res.body;
            expect(res.status).toBe(201);

            // console.log(report);
            expect(isValidDate(report.createdAt)).toBe(true);
            expect(report).toHaveProperty("_id", expect.any(String));
            expect(report).toHaveProperty("userId", expect.any(String));
            expect(report).toHaveProperty("quizId", expect.any(String));
            expect(report).toHaveProperty("playersCount", expect.any(Number));
            expect(report).toHaveProperty("players", expect.any(Array));
            report.players.forEach((player) => {
              expect(player).toHaveProperty("name", expect.any(String));
              expect(player).toHaveProperty("score", expect.any(Number));
            });

            done();
          }
        });
    }),
    it("Delete report by Id (60fad998cbd8d3ed1ba95f71)", (done) => {
      request(app)
        .delete("/reports/60fad998cbd8d3ed1ba95f71")
        .set({ access_token: process.env.ACCESS_TOKEN })
        .end((err, res) => {
          if (err) done(err);
          else {
            const response = res.body;
            expect(res.status).toBe(200);
            expect(response).toHaveProperty("message", "Delete Item Success");

            done();
          }
        });
    });
});

describe("Reports [ERROR CASE]", () => {
  it("User must login first", (done) => {
    request(app)
      .get("/reports")
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(401);
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 401,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );

          done();
        }
      });
  }),
    it("Report not found, wrong Id", (done) => {
      request(app)
        .get("/reports/AbsolutlyWrong")
        .set({ access_token: process.env.ACCESS_TOKEN })
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
    }),
    it("quizId is null", (done) => {
      request(app)
        .post("/reports")
        .set({ access_token: process.env.ACCESS_TOKEN })
        .send({
          ...reportData,
          quizId: null,
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.arrayContaining([expect.any(String)]),
              })
            );
            done();
          }
        });
    });
  it("Empty input", (done) => {
    request(app)
      .post("/reports")
      .set({ access_token: process.env.ACCESS_TOKEN })
      .send({})
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(
            expect.objectContaining({
              message: expect.arrayContaining([expect.any(String)]),
            })
          );
          done();
        }
      });
  });
  it("Invalid Access Token", (done) => {
    request(app)
      .get(`/reports`)
      .set({ access_token: "AbsolutlyNotAccesToken" })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status).toBe(401);

          expect(res.body).toEqual(
            expect.objectContaining({
              code: 401,
              message: expect.arrayContaining([expect.any(String)]),
            })
          );
          done();
        }
      });
  }),
  it("Cannot delete report, wrong Id", (done) => {
    request(app)
      .delete("/reports/AbsolutlyWrong")
      .set({ access_token: process.env.ACCESS_TOKEN })
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
          client.close().then((_) => {
            done();
          });
        }
      });
  }),

    it("Internal Server Erro (get all reports)", (done) => {
      request(app)
        .get(`/reports`)
        .set({ access_token: process.env.ACCESS_TOKEN })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).toBe(500);

            expect(res.body).toEqual(
              expect.objectContaining({
                code: 500,
                message: expect.arrayContaining([expect.any(String)]),
              })
            );
            // client.connect().then((_) => {
            // });
            done();
          }
        });
    }),
    it("Internal Server Error (get report by Id)", (done) => {
      request(app)
        .get("/reports/60fad998cbd8d3ed1ba95f71")
        .set({ access_token: process.env.ACCESS_TOKEN })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).toBe(500);

            expect(res.body).toEqual(
              expect.objectContaining({
                code: 500,
                message: expect.arrayContaining([expect.any(String)]),
              })
            );
            client.connect().then((_) => {
              done();
            });
          }
        });
    });
});
