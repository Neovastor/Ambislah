const app = require('../app')
const request = require('supertest')
const { connect } = require('../config/mongodb')
const {hash} = require('../helpers/bcrypt')

let connection = null
let client = null
let db = null

let user_data = {
  "email": "email@mail.com",
  "password": "password"
}

beforeAll(async () => {
  if (process.env.NODE_ENV == "test") {
    connection = await connect()
    client = connection.client
    db = connection.database

    await db.collection("Users").insertOne({...user_data, password: hash(user_data.password)})

    return connection
  }
})
afterAll(async () => {
  if (process.env.NODE_ENV == "test") {
    await db.collection("Users").deleteMany({});

    await client.close();
  }
})


jest.setTimeout(5000)
describe('Login [SUCCESS CASE]', () => {
  it('login user success', (done) => {
    request(app)
      .post('/login')
      .send(user_data)
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
      .send({...user_data, password: null})
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
      .send({...user_data, email: null})
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