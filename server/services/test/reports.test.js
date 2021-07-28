const { connect } = require("../config/mongodb");
const app = require("../app");
const request = require("supertest");
<<<<<<< HEAD
const { dummyReports, isValidDate } = require("./reports.helpers");
=======
const { dummyReports, isValidDate } = require("./testing.helpers");
const {generateJWT, verifyJWT}= require('../helpers/jwt')
>>>>>>> testing

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

const user_data = {
  "email": "email@mail.com",
  "password": "password"
}

let access_token = null
let id = null

beforeAll(async () => {
  if (process.env.NODE_ENV == "test") {
    connection = await connect();
    client = connection.client;
    db = connection.database;

    const users = await db.collection("Users");
    let {insertedId} = await users.insertOne(user_data)

    access_token =  generateJWT({
        email: user_data.email,
        name: "email",
        id: insertedId
    })

    let inputReports = dummyReports()
    inputReports.forEach(el => el.userId = insertedId.toHexString())

    const reports = await db.collection("Reports");
    const {insertedIds} = await reports.insertMany(inputReports);

    id = insertedIds[0].toHexString()

    // let dbReport =  await db.collection("Reports").find().toArray()
    // console.log(dbReport);

    return connection;
  }
});

afterAll(async () => {
  if (process.env.NODE_ENV == "test") {
    await db.collection("Reports").deleteMany({});
    await db.collection("Users").deleteMany({});

    await client.close();
  }
});

jest.setTimeout(10000);

describe("Reports [SUCCESS CASE]", () => {
  it("Get all reports", (done) => {
    request(app)
      .get("/reports")
<<<<<<< HEAD
=======
      .set({access_token})
>>>>>>> testing
      .end((err, res) => {
        if (err) done(err);
        else {
          const reportsArray = res.body;
<<<<<<< HEAD
          // console.log(reportsArray);
          // expect(res.status).toBe(200);
=======
          expect(res.status).toBe(200);
>>>>>>> testing

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
  it("Get report by Id", (done) => {
    request(app)
<<<<<<< HEAD
      .get("/reports/60fad998cbd8d3ed1ba95f71")
=======
      .get(`/reports/${id}`)
      .set({access_token})
>>>>>>> testing
      .end((err, res) => {
        if (err) done(err);
        else {
          const report = res.body;
          // console.log(report);
          expect(res.status).toBe(200);
<<<<<<< HEAD
          expect(isValidDate(report.date)).toBe(true);
          expect(report._id).toBe("60fad998cbd8d3ed1ba95f71");
=======
          // expect(report._id).toBe(id);
          expect(isValidDate(report.createdAt)).toBe(true);
>>>>>>> testing
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
<<<<<<< HEAD
=======
        .set({access_token})
>>>>>>> testing
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
    it("Delete report by Id", (done) => {
      request(app)
<<<<<<< HEAD
        .delete("/reports/60fad998cbd8d3ed1ba95f71")
=======
        .delete(`/reports/${id}`)
        .set({access_token})
>>>>>>> testing
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
<<<<<<< HEAD
    it("User Id is null", (done) => {
      request(app)
        .post("/reports")
=======
    it("Report not found, wrong Id", (done) => {
      request(app)
        .get("/reports/AbsolutlyWrong")
        .set({access_token})
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
        .set({access_token})
>>>>>>> testing
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
<<<<<<< HEAD
  it("Cannot delete report, wrong Id", (done) => {
    request(app)
      .delete("/reports/AbsolutlyWrong")
=======
  it("Empty input", (done) => {
    request(app)
      .post("/reports")
      .set({access_token})
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
      .set({access_token})
>>>>>>> testing
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
<<<<<<< HEAD
  });
=======
  }),

    it("Internal Server Error (get all reports)", (done) => {
      request(app)
        .get(`/reports`)
        .set({access_token})
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
        .set({access_token})
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
>>>>>>> testing
});
