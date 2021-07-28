import {InMemoryCache, ApolloClient, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { createdQuizVar } from './vars'

     
const client = new ApolloClient({
  // uri: 'http://localhost:4000',
  uri: 'http://100.26.221.233',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          createdQuiz: {
            read() {
              return createdQuizVar()
            }
          },
        }
      }
    }
  })
})

export default client