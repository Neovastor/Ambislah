const { gql } = require('apollo-server')

const typeDefs = gql`
    type questions {
        type: String
        question: String
        image: String
        chosse: [String]
        answer: String
    }

    type Quizzes {
        _id: ID
        userId: Int
        questions: [questions]
        timer: Int
        mode: String
    }

    type Query {
        Quizzes : [Quizzes]
        QuizzesById (id:ID) : Quizzes
    }

`

module.exports = typeDefs