const { database } = require('../config/mongodb')
const { ObjectId } = require("mongodb");

class Quizzes {
    static async findAll() {

        const quizzesCollection = database().collection('Quizzez')
        const quizzes = await quizzesCollection.find().toArray()
        return quizzes
    }

    static async findOne(id) {

        const quizzesCollection = database().collection('Quizzez')

        const quizzes = await quizzesCollection.find({
            _id: ObjectId(id)
        }).toArray()

        return quizzes[0]
    }

    static async postMovie(payload) {
        const { title, overview, poster_path, popularity, tags } = payload
        let result = { title, overview, poster_path, popularity, tags }
        let err = {
            message: []
        }
        if (!title) {
            err.message.push("title must be filled")
        }
        if (!overview) {
            err.message.push("overview must be filled")
        }
        if (!poster_path) {
            err.message.push("poster path must be filled")
        }
        if (!popularity) {
            err.message.push("popularity must be filled")
        }
        if (!tags) {
            err.message.push("tags must be filled")
        }

        if (err.message.length > 0) {
            return err
        }

        const moviesCollection = database().collection('Quizzez')

        let movies = await moviesCollection.insertOne(result)

        result._id = movies.insertedId

        return result
    }

    static async putMovie(payload, id) {
        const { title, overview, poster_path, popularity, tags } = payload

        let err = {
            message: []
        }
        if (!title) {
            err.message.push("title must be filled")
        }
        if (!overview) {
            err.message.push("overview must be filled")
        }
        if (!poster_path) {
            err.message.push("poster path must be filled")
        }
        if (!popularity) {
            err.message.push("popularity must be filled")
        }
        if (!tags) {
            err.message.push("tags must be filled")
        }

        if (err.message.length > 0) {
            return err
        }

        let result = {
            data: { title, overview, poster_path, popularity, tags }            
        }

        const moviesCollection = database().collection('Quizzez')

        let movies = await moviesCollection.updateOne(
            {
                _id: ObjectId(id)
            }, {
            $set: result.data
        })
        
        result.data._id = id
        result.matchedCount = movies.matchedCount 

        return result
    }

    static async deleteMovie(id) {

        const moviesCollection = database().collection('Quizzez')

        let movies = await moviesCollection.deleteMany({
            _id: ObjectId(id)
        })
        
        return movies
    }

}

module.exports = Quizzes