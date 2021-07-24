const { gql } = require('apollo-server')
const { merge } = require('lodash')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const { typeDef: Reports, resolvers: reportsResolvers } = require('./reports')
const { GraphQLScalarType, Kind } = require('graphql')


const typeDef = gql`
  scalar Date

  type Message {
      message: String
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: dateScalar
};



const schema = makeExecutableSchema({
    typeDefs: [ typeDef, Reports],
    resolvers: merge(resolvers, reportsResolvers)
});

module.exports = schema