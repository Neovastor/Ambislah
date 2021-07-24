<<<<<<< HEAD
const { ApolloServer, gql, ApolloError } = require ('apollo-server')
const axios = require ('axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
  type Register {
    acknowledged: String,
    insertedId: ID
  }
  type Login {
    access_token: String
  }
  type GoogleLogin {
    access_token: String
  }
  type Query {
    loginpage: Login
    registerpage: Register
    googlepage: GoogleLogin
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
        const res = await axios.post('http://localhost:4001/register', data)
        const output = await res.data
        redis.del('Register')
        return output
        
      } catch (err) {
        throw new ApolloError('status: 500 - Internal Server Error')
      }
    },
    login: async (parent, args, context, info) => {
      try {
        const data = {
          email: args.login.email,
          password: args.login.password
        }
        const res = await axios.post('http://localhost:4001/login', data)
        const output = await res.data
        redis.del('Login')
        return output
        
      } catch (err) {
        throw new ApolloError('status: 500 - Internal Server Error')
      }
    },
    googlelogin: async (parent, args, context, info) => {
      try {
        const data = {
          id_token: args.idToken.id_token
        }
        const res = await axios.put(`http://localhost:4001/googlelogin`, data)
        const output = await res.data
        redis.del('GoogleLogin')
        return output
        
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
=======
const { ApolloServer} = require('apollo-server')
const schema = require('./schema')
const PORT = process.env.PORT || 4000

const server = new ApolloServer({
  schema, 
  cors: true
});


// The `listen` method launches a web server.
server.listen({port: PORT}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
>>>>>>> development
