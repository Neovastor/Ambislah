const app = require('../app')
const request = require('supertest')
const { connect } = require('../config/mongodb')

let connection
let client
let db

// let id_token = process.env.ID_TOKEN


beforeAll(async () => {
  connection = await connect()
  client = connection.client
  db = connection.database
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
      // .send({id_token})
      .end((err, res) => {
        console.log('OK')
        // expect(res.status).toBe(200)
        console.log(res.body);
        expect(res.body).toEqual(
          expect.objectContaining({
            access_token: expect.any(String)
          })
        )
        done()
      })
  })
})