const Kahoot = require('../models/Kahoot')
const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')
const { comparePassword } = require('../helpers/bcrypt')
const {generateJWT, verifyJWT} = require('../helpers/jwt')

class AuthController {
  static async findAll(req, res) {
    try {
      const kahoot = await Kahoot.findAll()
      res.json(kahoot)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
  static async register(req, res, next) {
    const { email, password } = req.body
    const name = email.split('@')[0]
    const input = { email, password, name }
    console.log('data register masuk>>>', email, password, name, '<< register masuk')
    const output = await Kahoot.register(input)
    res.status(201).json(output)
  }
  static async login(req, res, next) {
    const { email, password } = req.body
    const name = email.split('@')[0]
    console.log('login masuk >>>', email, name, 'masuk login')
    const output = await getDatabase().collection('cek').findOne({ email: email })
    console.log('>>', output)
    if (output) {
      if (comparePassword(password, output.password)) {
        const userInfo = {
          email: output.email,
          name: output.name
        }
        const token = generateJWT(userInfo)
        console.log(token)
        req.headers.access_token = token
        res.status(200).json({ access_token: token })
      }
    }
  }
  static async findOne(req, res) {
    const id = req.params.id
    try {
      const kahoot = await Kahoot.findOne(id)
      res.json(kahoot)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
  static async addMovie(req, res) {
    const data = req.body
    try {
      const kahoot = await Kahoot.addMovie(data)
      res.json(kahoot)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
  static async editMovie(req, res) {
    const id = req.params.id
    const data = req.body
    try {
      const kahoot = await Kahoot.editMovie(id, data)
      res.json(kahoot)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
  static async deleteMovie(req, res) {
    const id = req.params.id
    try {
      const kahoot = Kahoot.deleteMovie(id)
      res.json(kahoot)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
}
module.exports = AuthController