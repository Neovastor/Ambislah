import { gql } from '@apollo/client'

export const GET_ALL_QUIZ = gql`
query Query($access_token: String) {
  Quizzes(access_token: $access_token) {
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

export const GET_ONE_QUIZ = gql `
query Query($id: ID, $access_token: String) {
  QuizzesById(id: $id, access_token: $access_token) {
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
mutation Mutation($input: InputQuizzes, $access_token: String) {
  AddQuizzes(input: $input, access_token: $access_token) {
    _id
    title
    questions {
      type
      question
      image
      choose
      answer
    }
    timer
    createdAt
    mode
    userId
    updatedAt
  }
}
`
export const DELETE_QUIZZEZ = gql`
mutation Mutation($id: ID, $access_token: String) {
  DeleteQuizzes(id: $id, access_token: $access_token) {
    message
  }
}
`

export const UPDATE_QUIZZES = gql`
mutation Mutation($id: ID, $input: InputQuizzes, $access_token: String) {
  EditQuizzes(id: $id, input: $input, access_token: $access_token) {
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