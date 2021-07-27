import { gql } from '@apollo/client'

export const ADD_QUIZZES = gql`
mutation Mutation($input: InputQuizzes) {
    AddQuizzes(input: $input) {
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

export const DELETE_QUIZ = gql`
mutation Mutation($quizId: ID) {
  DeleteQuizzes(id: $quizId) {
    message
  }
}
`

export const EDIT_QUIZ = gql`
mutation Mutation($quizId: ID, $inputQuiz: InputQuizzes) {
  EditQuizzes(id: $quizId, input: $inputQuiz) {
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

export const GET_ALL_QUIZZES = gql`
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

export const GET_QUIZ = gql`
query Query($quizId: ID) {
  QuizzesById(id: $quizId) {
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