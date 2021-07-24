import {gql} from '@apollo/client'

export const ADD_REPORT = gql `
mutation Mutation($input: InputReport) {
  addReports(input: $input) {
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
mutation Mutation($idReport: ID!) {
  delReports(id: $idReport) {
    message
  }
}

`

export const GET_ALL_REPORTS = gql `
query Query {
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
}`

export const SEARCH_REPORT = gql `
query Query($inputUserId: String, $inputQuizId: String) {
  getReportsAll(userId: $inputUserId, quizId: $inputQuizId) {
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
`


export const GET_REPORT = gql `
query Query($idReport: ID!) {
  getReports(id: $idReport) {
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
`