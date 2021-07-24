const app = require('../app.js')
const { connect } = require('../config/mongodb')
const port = process.env.PORT || 3000

connect().then(async database => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})
