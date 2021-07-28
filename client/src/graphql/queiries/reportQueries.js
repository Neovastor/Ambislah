import {gql} from '@apollo/client'

export const ADD_REPORT = gql `
mutation Mutation($input: InputReport, $access_token: String) {
  addReports(input: $input, access_token: $access_token) {
      getReportsAll {
      _id
      userId
      quizId
      date
      playersCount
      players {
        name
        score
      }
    }
  }
}
`
export const DELETE_REPORT = gql `
mutation Mutation($idReport: ID!, $access_token: String ) {
  delReports(id: $idReport, access_token: $access_token) {
    message
  }
}

`

export const GET_ALL_REPORTS = gql `
query Query($access_token: String) {
  getReportsAll(access_token: $access_token) {
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
}`


export const GET_ONE_REPORT = gql `
query Query($idReport: ID, $access_token: String) {
  getReports(id: $idReport, access_token: $access_token) {
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