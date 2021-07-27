import { InMemoryCache, ApolloClient } from '@apollo/client'
import { createdQuizVar } from './vars'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
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