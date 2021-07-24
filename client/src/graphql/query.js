import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Mutation($input: Formulir) {
  register(register: $input) {
    acknowledged
    insertedId
  }
}
`