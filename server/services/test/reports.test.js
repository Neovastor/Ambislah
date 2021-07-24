const { connect } = require("../config/mongodb");
const app = require("../app");
const request = require("supertest");
const { dummyReports, isValidDate } = require("./reports.helpers");

// const {signJWT, verifyJWT} = require('../helpers/jwt')
// require('dotenv').config()
let db = null;
let client = null;
let connection = null;

const reportData = {
  userId: "123abcKi",
  quizId: "1021efg",
  date: new Date(),
  playersCount: 1,
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

jest.setTimeout(10000);

describe("Reports [SUCCESS CASE]", () => {
  it("Get all reports", (done) => {
    request(app)
      .get("/reports")
      .end((err, res) => {
        if (err) done(err);
        else {
          const reportsArray = res.body;
          // console.log(reportsArray);
          // expect(res.status).toBe(200);

          reportsArray.forEach((report) => {
            expect(isValidDate(report.date)).toBe(true);
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
      .end((err, res) => {
        if (err) done(err);
        else {
          const report = res.body;
          expect(res.status).toBe(200);
          expect(isValidDate(report.date)).toBe(true);
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
        .end((err, res) => {
          if (err) done(err);
          else {
            const report = res.body;
            expect(res.status).toBe(201);

            // console.log(report);
            expect(isValidDate(report.date)).toBe(true);
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

describe("Reports [FAILURE CASE]", () => {
  it("Report not found, wrong Id", (done) => {
    request(app)
      .get("/reports/AbsolutlyWrong")
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
    it("User Id is null", (done) => {
      request(app)
        .post("/reports")
        .send({
          ...reportData,
          userId: null,
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            const error = ["userId cannot be empty"];
            const response = res.body;
            expect(res.status).toBe(400);
            expect(response).toHaveProperty(
              "message",
              expect.arrayContaining(error)
            );
            done();
          }
        });
    });
  it("Cannot delete report, wrong Id", (done) => {
    request(app)
      .delete("/reports/AbsolutlyWrong")
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
