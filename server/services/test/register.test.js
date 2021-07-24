const app = require('../app')
const request = require('supertest')
const { connect } = require('../config/mongodb')

let connection
let client
let db

beforeAll(async () => {
  connection = await connect()
  client = connection.client
  db = connection.db
  return connection
})
afterAll(async () => {
  await client.close()
})
const user = {
  "email": "israhadi@mail.com",
  "password": "hogake-ke-7"
}
jest.setTimeout(10000)
describe('register user', () => {
  it('register', (done) => {
    request(app)
      .post('/register')
      .send(user)
      .end((err, res) => {
        console.log('OK')
        expect(res.status).toBe(201)
        expect(res.body).toEqual(
          expect.objectContaining({
            acknowledge: expect.any(String),
            insertedId: expect.any(String)
          })
        )
        done()
      })
  })
})