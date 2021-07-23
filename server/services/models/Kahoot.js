const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class Kahoot {
  static async findAll() {
    return await getDatabase().collection('cek').find().toArray()
  }
  static async register(input) {
    return await getDatabase().collection('cek').insertOne(input)
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