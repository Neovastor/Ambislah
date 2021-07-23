const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')
const { hash } = require('../helpers/bcrypt')

class Kahoot {
  static async findAll() {
    return await getDatabase().collection('cek').find().toArray()
  }
  static async register(input) {
    input.password = hash(input.password)
    input.createdAt = new Date().toLocaleDateString() + ' and ' + new Date().toLocaleTimeString()
    return await getDatabase().collection('cek').insertOne(input)
  }
  static async login(email) {
    return await getDatabase().collection('cek').findOne({ email })
  }
  static async findOne(id) {
    return await getDatabase().collection('cek').findOne({_id: ObjectId(id)})
  }
  static async addMovie(cek) {
    return await getDatabase().collection('cek').insertOne(cek)
  }
  static async editMovie(id, cek) {
    return await getDatabase().collection('cek').updateOne(
      {_id: ObjectId(id)},
      {$set: cek}
    )
  }
  static async deleteMovie(id) {
    return await getDatabase().collection('cek').deleteOne({_id: ObjectId(id)})
  }
}
module.exports = Kahoot