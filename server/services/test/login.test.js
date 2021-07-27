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
afterAll(async () => {
  await db.collection("Users").remove({});
  await client.close();
});
jest.setTimeout(10000)
describe('login user', () => {
  it('login', (done) => {
    request(app)
      .post('/login')
      .send(userlogin)
      .end((err, res) => {
        console.log('OK')
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