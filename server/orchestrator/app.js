const { ApolloServer, gql, ApolloError } = require ('apollo-server')
const axios = require ('axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
  type Register {
    acknowledged: String,
    insertedID: ID
  }
  type Login {
    access_token: String
  }
  type GoogleLogin {
    access_token: String
  }
  type Mutation {
    register(register: Formulir): Register
    login(login: Formulir): Login
    googlelogin(idToken: Token): GoogleLogin
  }
  input Formulir {
    email: String!
    password: String!
  }
  input Token {
    id_token: String!
  }
`
const resolvers = {
  Mutation: {
    register: async (parent, args, context, info) => {
      try {
        const data = {
          email: args.register.email,
          password: args.register.password
        }
        const res = await axios.post('http://3.238.38.78/movies', data)
        const movies = await res.data
        redis.del('Movies')
        return data
        
      } catch (err) {
        throw new ApolloError('status: 500 - Internal Server Error')
      }
    },
    login: async (parent, args, context, info) => {
      try {
        const data = {
          title: args.tv.title,
          overview: args.tv.overview,
          poster_path: args.tv.poster_path,
          popularity: args.tv.popularity,
          tags: args.tv.tags
        }
        const res = await axios.post('http://34.232.76.199/tvseries', data)
        const tv = await res.data
        redis.del('TV_Series')
        return data
        
      } catch (err) {
        throw new ApolloError('status: 500 - Internal Server Error')
      }
    },
    googlelogin: async (parent, args, context, info) => {
      try {
        const data = {
          title: args.movies.title,
          overview: args.movies.overview,
          poster_path: args.movies.poster_path,
          popularity: args.movies.popularity,
          tags: args.movies.tags
        }
        const res = await axios.put(`http://3.238.38.78/movies/${args._id}`, data)
        const editMovies = await res.data
        redis.del('Movies')
        return data
        
      } catch (err) {
        throw new ApolloError('status: 500 - Internal Server Error')
      }
    }
  }
}
 
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log('server berjalan  di AWS - http://3.89.146.243:4000 -', url)
})