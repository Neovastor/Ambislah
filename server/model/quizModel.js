const { database } = require('../config/mongodb')
const { ObjectId } = require("mongodb");

class Quizzes {
    static async findAll() {

        const quizzesCollection = database().collection('Quizzes')
        const quizzes = await quizzesCollection.find().toArray()
        return quizzes
    }

    static async findOne(id) {

        const quizzesCollection = database().collection('Quizzes')

        const quizzes = await quizzesCollection.find({
            _id: ObjectId(id)
        }).toArray()

        return quizzes[0]
    }

    static async postQuiz(payload) {
        const { userId, questions, timer, mode} = payload
        let result = { userId, questions, timer, mode}
        let err = {
            message: []
        }
        if (!userId) {
            err.message.push("userId must be filled")
        }
        if (!questions) {
            err.message.push("questions must be filled")
        }
        
        if (!timer) {
            err.message.push("timer must be filled")
        }
        if (!mode) {
            err.message.push("mode must be filled")
        }

        if (err.message.length > 0) {
            return err
        }

        const quizzesCollectios = database().collection('Quizzes')

        let quizzes = await quizzesCollectios.insertOne(result)
        
        result._id = quizzes.insertedId

        return result
    }

    static async putQuiz(payload, id) {
        const { userId, questions, timer, mode} = payload

        let err = {
            message: []
        }
        if (!userId) {
            err.message.push("userId must be filled")
        }
        if (!questions) {
            err.message.push("questions must be filled")
        }
        
        if (!timer) {
            err.message.push("timer must be filled")
        }
        if (!mode) {
            err.message.push("mode must be filled")
        }

        if (err.message.length > 0) {
            return err
        }

        let result = { userId, questions, timer, mode};            

        const quizzesCollection = database().collection('Quizzes')

        let quizzes = await quizzesCollection.updateOne(
            {
                _id: ObjectId(id)
            }, {
            $set: result
        })
        
        result._id = id
        result.matchedCount = quizzes.matchedCount 

        return result
    }

    static async deleteQuiz(id) {

        const quizzesCollection = database().collection('Quizzes')

        let quizzes = await quizzesCollection.deleteMany({
            _id: ObjectId(id)
        })
        
        return quizzes
    }

}

module.exports = Quizzes