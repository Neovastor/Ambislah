<<<<<<< HEAD
const {MongoClient} = require('mongodb')

const url = 'mongodb://localhost:27017';

let dbSend = null;

async function connect() {

    const client = new MongoClient(url)

    const environment = process.env.NODE_ENV
    const dbName = environment === 'test' ? 'test' : 'ambislah' // ni untuk db test sm dev
    
     
    // Use connect method to connect to the server
    await client.connect()
    console.log('Connected successfully to server')
    
    const database = client.db(dbName)
    
    dbSend = database

    return {database, client}
}

function database(){
    return dbSend
}

module.exports= {
    connect,
    database
=======
const { MongoClient, ObjectId } = require('mongodb')
// Connection URL
// const url = 'mongodb+srv://admin:Admin123@server-movies.rrpd0.mongodb.net/entertainme'
const url = 'mongodb://localhost:27017'
let db = null

async function connect() {
    const client = new MongoClient(url)
    const environment = process.env.NODE_ENV
    const dbName = environment === 'test' ? 'ambislah_testing' : 'ambislah'

    await client.connect()
    console.log('Connected successfully to server')
        
    const database = client.db(dbName)
    db = database

    return {database, client}
} 

function getDatabase () {
    return db
}

module.exports = {
    connect,
    getDatabase,
    ObjectId
>>>>>>> development
}