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
<<<<<<< HEAD
`
export const GOOGLE_LOGIN = gql`
  mutation Mutation($input: Token) {
  googlelogin(idToken: $input) {
    access_token
  }
}
=======
>>>>>>> cae54ea2367a79c79e4e332cf8ad6c75304bdbdc
`