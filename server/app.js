const express = require('express')
const routesForReports = require('./routes/routeReports')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/', routesForReports)

module.exports = {app, port}