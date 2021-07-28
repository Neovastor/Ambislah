import { InMemoryCache, ApolloClient, createHttpLink, useReactiveVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createdQuizVar, accessToken } from './vars'

const httpLink = new createHttpLink({
  // uri: 'http://100.26.221.233'
  uri: `http://localhost:4000/`
})

const authLink = setContext((_, { headers }) => {
  const access_token = useReactiveVar(accessToken) || ''
  console.log(access_token, 'ini config grapg ql');
  return {
    headers: {
      ...headers,
      authorization: access_token ? `${access_token}` : "",
    }
  }
})

const client = new ApolloClient({
  credentials: 'include',
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
  }),
})

// import {InMemoryCache, ApolloClient} from '@apollo/client'

// const client = new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache()

export default client