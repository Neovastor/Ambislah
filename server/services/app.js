const express = require('express')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/', routes)

module.exports = {app, port}