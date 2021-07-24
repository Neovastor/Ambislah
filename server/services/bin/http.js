const { connect } = require('../config/mongodb')
const {app, port} = require('../app')

connect().then(async (database) => {
    // console.log(database);
    app.listen(port, () => {
      console.log(`Reports running at http://localhost:${port}`)
    })
})