const { gql } = require('apollo-server')

const typeDefs = gql`
    type questions {
        type: String
        question: String
        image: String
        choose: [String]
        answer: String
    }

    type Quizzes {
        _id: ID
        userId: String
        questions: [questions]
        timer: Int
        mode: String
    }

    input InputQuestion{
        type: String
        question: String
        image: String
        choose: [String]
        answer: String
    }

    input InputQuizze {
        _id: ID
        userId: String
        questions: [InputQuestion]
        timer: Int
        mode: String
    }

    type Query {
        Quizzes : [Quizzes]
        QuizzesById (id:ID) : Quizzes
    }
    
    type Mutation {
        DeleteQuizzesById(id:ID): String
        EditQuizzesById(id:ID, userId:String, questions:[InputQuestion],timer:Int,mode:String) : Quizzes
        AddQuizzesById(userId:String, questions:[InputQuestion],timer:Int,mode:String) : Quizzes
    }
`

module.exports = typeDefs