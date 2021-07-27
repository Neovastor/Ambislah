import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Mutation($input: Formulir) {
  register(register: $input) {
    acknowledged
    insertedId
  }
}
`
export const LOGIN = gql`
  mutation Mutation($input: Formulir) {
  login(login: $input) {
    access_token
  }
}
`
export const GOOGLE_LOGIN = gql`
  mutation Mutation($input: Token) {
  googlelogin(idToken: $input) {
    access_token
  }
}
`