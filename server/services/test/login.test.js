const app = require('../app')
const request = require('supertest')
const { connect } = require('../config/mongodb')

let connection
let client
let db

const userlogin = {
  "email": "israhadi@mail.com",
  "password": "hogake-ke-7"
}
beforeAll(async () => {
  connection = await connect()
  client = connection.client
  db = connection.database
  await db.collection("Users").insertOne(userlogin)
  return connection
})
// afterAll(async () => {
//   await db.collection("Users").remove({});
//   await client.close();
// });
//   return connection
// })
afterAll(async () => {
  await client.close()
})
const user = {
  "email": "israhadi@mail.com",
  "password": "hogake-ke-7"
}

jest.setTimeout(10000)
describe('Login [SUCCESS CASE]', () => {
  it('login user success', (done) => {
    request(app)
      .post('/login')
      .send(userlogin)
      .end((err, res) => {
        // console.log(res.body)
        expect(res.status).toBe(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            access_token: expect.any(String)
          })
        )
        done()
      })
  })
})

describe('login [ERROR CASE]', () => {
  it('login user failed, wrong password', (done) => {
    request(app)
      .post('/login')
      .send({...user, password: null})
      .end((err, res) => {
        // console.log(res.body)
        expect(res.status).toBe(400)
        expect(res.body).toEqual(
          expect.objectContaining({
            code: 400,
            message: expect.any(Array)
          })
        )
        done()
      })
  }),
  it('login user failed, wrong email', (done) => {
    request(app)
      .post('/login')
      .send({...user, email: null})
      .end((err, res) => {
        // console.log(res.body)
        expect(res.status).toBe(400)
        expect(res.body).toEqual(
          expect.objectContaining({
            code: 400,
            message: expect.any(Array)
          })
        )
        done()
      })
  })
})