const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')
const { hash } = require('../helpers/bcrypt')

class Kahoot {
  static async findAll() {
    return await getDatabase().collection('Users').find().toArray()
  }
  static async register(input) {
    input.password = hash(input.password)
    input.createdAt = new Date().toLocaleDateString() + ' and ' + new Date().toLocaleTimeString()
    return await getDatabase().collection('Users').insertOne(input)
  }
  static async login(email) {
    return await getDatabase().collection('Users').findOne({ email })
  }
  static async findOne(id) {
    return await getDatabase().collection('Users').findOne({_id: ObjectId(id)})
  }
  static async add(Users) {
    return await getDatabase().collection('Users').insertOne(Users)
  }
  static async edit(id, Users) {
    return await getDatabase().collection('Users').updateOne(
      {_id: ObjectId(id)},
      {$set: Users}
    )
  }
  static async delete(id) {
    return await getDatabase().collection('Users').deleteOne({_id: ObjectId(id)})
  }
}
module.exports = Kahoot