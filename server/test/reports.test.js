const {connect} = require('../config/mongodb')
const {app} = require("../app");
const request = require("supertest");
const dummyReports = require('./reports.dummy')

// const {signJWT, verifyJWT} = require('../helpers/jwt')
// require('dotenv').config()
let db = null
let client = null
let connection = null

beforeAll(async () => {
    if(process.env.NODE_ENV == 'test') {
        connection = await connect();
        client = connection.client;
        db = connection.database;
        
        const reports = await db.collection('Reports')
        reports.insertMany(dummyReports())

        return connection;
    }
  });
  

afterAll(async () => {
    if(process.env.NODE_ENV == 'test') {
        const reports = await db.collection('Reports')
        // console.log(collectionReports);
        await reports.deleteMany({})
        await client.close()
    }
})


jest.setTimeout(10000);
describe("Get all Reports [SUCCESS CASE]", () => {
  it("Reports", (done) => {
    request(app)
      .get("/reports")
      .end((err, res) => {

        if (err) done(err);
        else {
          console.log("OK");
          expect(res.status).toBe(200);

        //   expect(res.body).toEqual(
        //     expect.arrayContaining([
        //       expect.objectContaining({
        //         _id: expect.any(String),
        //         userId: expect.any(Number),
        //         timer: expect.any(Number),
        //         mode: expect.any(String),
        //         // questions: expect.any(Number),
        //       }),
        //     ])
        //   );

          done();
        }
      });
  });
});