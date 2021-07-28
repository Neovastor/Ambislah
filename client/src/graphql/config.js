import {InMemoryCache, ApolloClient, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { createdQuizVar } from './vars'


const httpLink = new createHttpLink({
  // uri: 'http://100.26.221.233'
  uri: 'http://localhost:4000',
})

const authLink = setContext((_, {headers}) => {
  const access_token = localStorage.getItem("access_token") || ''
  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

// import {InMemoryCache, ApolloClient} from '@apollo/client'

// const client = new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache()

export default client