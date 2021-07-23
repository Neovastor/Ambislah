// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  // require('dotenv').config()
  // }
const { connect } = require('./config/mongodb')
const express = require('express')
const AuthController = require('./controllers/AuthController')
const app = express()
const PORT = process.env.PORT || 4001
// const cors = require('cors')

// app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
let db = null

app.get('/', async (req, res) => {
  const cek = await db.collection('cek').find().toArray()
  res.json(cek)
})
// app.get('/', (req, res) => {
//   res.send('server 4001 is running in home')
// })

//finalproject
app.get('/login', AuthController.findAll)

connect().then(async (database) => {
  const cek = await database.collection('cek').find().toArray()
  console.log('sudah konek>>')
  db = database
  app.listen(PORT, () => {
    console.log('App sudah di listen di port', PORT)
  })
})

// module.exports = app