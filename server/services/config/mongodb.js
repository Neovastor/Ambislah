const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
let db = null

async function connect() {
  const client = new MongoClient(url)
  const dbName = 'databaseFINALP'
  await client.connect()

  const database = client.db(dbName)
  db = database
  return database
}
function getDatabase() {
  return db
}
module.exports = {
  connect,
  getDatabase
}