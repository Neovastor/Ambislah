import {gql} from '@apollo/client'

export const ADD_REPORT = gql `
mutation Mutation($inputReport: InputReport) {
  addReports(input: $inputReport) {
    _id
    userId
    quizId
    quizTitle
    playersCount
    players {
      name
      score
    }
    createdAt
  }
}
`
export const DELETE_REPORT = gql `
mutation Mutation($reportId: ID!) {
  delReports(id: $reportId) {
    message
  }
}

`

export const GET_ALL_REPORTS = gql `
query Query($quizId: String) {
  getReportsAll(quizId: $quizId) {
    _id
    userId
    quizId
    quizTitle
    playersCount
    players {
      name
      score
    }
    createdAt
  }
}
`

export const GET_REPORT = gql `
query Query($reportId: ID) {
  getReports(id: $reportId) {
    _id
    userId
    quizId
    quizTitle
    playersCount
    players {
      name
      score
    }
    createdAt
  }
}
`