import {InMemoryCache, ApolloClient, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { createdQuizVar } from './vars'


const httpLink = new createHttpLink({
  uri: 'http://100.26.221.233'
})

const authLink = setContext((_, {headers}) => {
  const access_token = localStorage.access_token || ''
  return {
    headers: {
      ...headers,
      authorization: access_token ? `${access_token}` : "",
    }
  }
})

const client = new ApolloClient({
  // fetchOptions: {
  //   credentials: "include"
  // },
  // clientState: {
  //   defaults: {
  //     isLoggedIn: !!localStorage.getItem('access_token')
  //   }
  // },
  credentials: 'include',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
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
  }),
})

// const client = new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache(),
// })

export default client