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
describe('login user [SUCCESS CASE]', () => {
  it('login user success', (done) => {
    request(app)
      .post('/login')
      .send(user)
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

// describe('login user [ERROR CASE]', () => {
//   it('login user failed', (done) => {
//     request(app)
//       .post('/login')
//       .send({...user, password: null})
//       .end((err, res) => {
//         console.log(res.body)
//         expect(res.status).toBe(400)
//         // expect(res.body).toEqual(
//         //   expect.objectContaining({
//         //     access_token: expect.any(String)
//         //   })
//         // )
//         done()
//       })
//   })
// })