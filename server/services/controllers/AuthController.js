const Kahoot = require('../models/Kahoot')
const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')
const { comparePassword } = require('../helpers/bcrypt')
const {generateJWT, verifyJWT} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

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
    try {
      const { email, password } = req.body
      const name = email.split('@')[0]
      const input = { email, password, name }
      console.log('data register masuk>>>', email, password, name, '<< register masuk')
      const output = await Kahoot.register(input)
      res.status(201).json(output)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  } 
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const name = email.split('@')[0]
      console.log('login masuk >>>', email, name, 'masuk login')
      const output = await Kahoot.login(email)
      // const output = await getDatabase().collection('cek').findOne({ email: email })
      console.log('>>', output, '<<')
      if (output) {
        console.log('>>2', output, '<<')
        console.log('333', comparePassword(password, output.password))
        console.log('4444', JSON.stringify(output._id))
        if (comparePassword(password, output.password)) {
          const userInfo = {
            email: output.email,
            name: output.name,
            id: JSON.stringify(output._id)
          }
          console.log(userInfo)
          const token = generateJWT(userInfo)
          console.log(token)
          req.headers.access_token = token
          res.status(200).json({ access_token: token })
        }
      }
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
  static async googlelogin(req, res, next) {
    try {
      let payload = null
      const token = req.body.id_token
      console.log('baruuu>>',token)   
      const client = new OAuth2Client(process.env.CLIENT_ID)
      console.log('ini CLIENT CLIENT⭐⭐⭐',client)
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      })   
      console.log('ini TICKETnya>>', ticket, '<< si TIKET')
      payload = ticket.getPayload()
      console.log('ini payload',payload, 'ini payload')
  
      const email = payload.email
      const output = await Kahoot.login(email)
      if (output) {
        console.log('output', '<><>')
        const userInfo = {
          email: output.email,
          name: output.name,
          id: JSON.stringify(output._id)
        }
        console.log(userInfo)
        const token = generateJWT(userInfo)
        console.log(token)
        req.headers.access_token = token
        res.status(200).json({ access_token: token })
      } else {
        const registration = {
          email: email,
          password: `Aa1@${payload.at_hash.split('_').join('').substring(0,5)}`,
          name: email.split('@')[0],
        }
        const output = await Kahoot.register(registration)
        const userInfo = {
          email: output.email,
          name: output.name,
          id: JSON.stringify(output._id)
        }
        console.log(userInfo)
        const token = generateJWT(userInfo)
        console.log(token)
        req.headers.access_token = token
        res.status(200).json({ access_token: token })
      }
      
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
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
  static async add(req, res) {
    const data = req.body
    try {
      const kahoot = await Kahoot.add(data)
      res.json(kahoot)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
  static async edit(req, res) {
    const id = req.params.id
    const data = req.body
    try {
      const kahoot = await Kahoot.edit(id, data)
      res.json(kahoot)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
  static async delete(req, res) {
    const id = req.params.id
    try {
      const kahoot = Kahoot.delete(id)
      res.json(kahoot)
    } catch (err) {
      err.response.data ? res.status(400).json({ msg: err.response.data }) : res.status(500).json({ error: err })
    }
  }
}
module.exports = AuthController