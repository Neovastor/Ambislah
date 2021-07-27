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
jest.setTimeout(10000)
describe('GOOGLE login', () => {
  it('google login', (done) => {
    request(app)
      .post('/googlelogin')
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