import { gql } from '@apollo/client'

export const GET_ALL_QUIZ = gql`
query Query {
  Quizzes {
    _id
    userId
    title
    questions {
      type
      question
      image
      choose
      answer
    }
    timer
    mode
    createdAt
  }
}
`

export const CREATED_QUIZZES = gql`
 query createdQuiz{
  createdQuiz @client
 }
`

export const ADD_QUIZZES = gql`
mutation AddQuizzesMutation($addQuizzesUserId: String, $addQuizzesTitle: String, $addQuizzesQuestions: [InputQuestion], $addQuizzesTimer: Int, $addQuizzesMode: String, $addQuizzesCreatedAt: Date) {
  AddQuizzes(userId: $addQuizzesUserId, title: $addQuizzesTitle, questions: $addQuizzesQuestions, timer: $addQuizzesTimer, mode: $addQuizzesMode, createdAt: $addQuizzesCreatedAt) {
    _id
    userId
    title
    questions {
      type
      question
      image
      choose
      answer
    }
    timer
    mode
    createdAt
  }
}
`

