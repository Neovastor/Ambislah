const { gql } = require('apollo-server')
const { merge } = require('lodash')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const { typeDef: Reports, resolvers: reportsResolvers } = require('./reports')
const { GraphQLScalarType, Kind } = require('graphql')
const dayjs = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat')


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
  parseValue(value) {
    return dayjs(value); // Convert incoming integer to Date
  },
  serialize(value) {
    dayjs.extend(localizedFormat)
    return dayjs(value).format('LLLL') // Convert outgoing Date to integer for JSON
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return dayjs(ast.value); // Convert hard-coded AST string to integer and then to Date
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