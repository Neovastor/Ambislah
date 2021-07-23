const Kahoot = require('../models/Kahoot')

class AuthController {
  static async findAll(req, res) {
    try {
      const kahoot = await Kahoot.findAll()
      res.json(kahoot)
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