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