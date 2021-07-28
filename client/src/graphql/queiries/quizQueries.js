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
    updatedAt
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
    updatedAt
  }
}
`
export const DELETE_QUIZZEZ = gql`
mutation DeleteQuizzesByIdMutation($deleteQuizzesByIdId: ID) {
  DeleteQuizzesById(id: $deleteQuizzesByIdId)
}
`

export const UPDATE_QUIZZES = gql`
mutation Mutation($editQuizzesByIdId: ID, $editQuizzesByIdUserId: String, $editQuizzesByIdTitle: String, $editQuizzesByIdQuestions: [InputQuestion], $editQuizzesByIdTimer: Int, $editQuizzesByIdMode: String, $editQuizzesByIdCreatedAt: Date) {
  EditQuizzesById(id: $editQuizzesByIdId, userId: $editQuizzesByIdUserId, title: $editQuizzesByIdTitle, questions: $editQuizzesByIdQuestions, timer: $editQuizzesByIdTimer, mode: $editQuizzesByIdMode, createdAt: $editQuizzesByIdCreatedAt) {
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
    updatedAt
  }
}
`