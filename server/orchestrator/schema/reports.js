const { gql } = require('apollo-server')
const { ApolloError } = require('apollo-server-errors')
const { instanceReports } = require('../axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDef = gql`
    type Report {
        _id: ID
        userId: String
        quizId: String
        date: String
        playersCount: Int
        players: [Player]
    }

    input InputReport {
        userId: String!
        quizId: String!
        players: [inputPlayer]!
    }

    input inputPlayer {
        name: String
        score: Int
    }

    type Player{
        name: String
        score: Int
    } 

    extend type Query {
        getReportsAll(input: String): [Report]
        getReports(id: ID!): Report
    }

    extend type Mutation {
        addReports(input: InputReport): Report
        delReports(id: ID!): Message
    }  
`

const resolvers = {

    Query: {
        getReportsAll: async(_, args) => {
            try {
                let result = null
                // const {input} = args
                const reports = await redis.get('reports')
                if (reports) {
                    result = JSON.parse(reports)
                } 
                else {
                    const {data} = await instanceReports({
                        method: 'get'
                    })
                    redis.set('reports', JSON.stringify(data))
                    result = data
                }
                return result
                
                // if (!input) {
                //     return result
                // }
                // else {
                //     const find = new RegExp(input, 'i');
                //     const filtered = result.filter(el => el.match(find))
                //     return filtered
                // }
            }
            catch(err) {
                throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
            }

        },
        getReports: async (_, args) => {
            try {
                const id = args.id
                let reportById = await redis.get('reportById')
                reportById = JSON.parse(reportById)
                
                if (reportById && reportById._id === id) {
                    return reportById
                } 
                else {
                    const {data} = await instanceReports({
                        method: 'get',
                        url: `/${id}`
                    })
                    return data
                }
            }
            catch (err) {
                if (err.response.status === 404) {
                    throw new ApolloError('Report Not Found', 'NOT_FOUND')
                } 
                else {
                    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    },
    Mutation: {
        addReports: async(_, args) => {
            try {
                const {userId, quizId, players} = args.input
                const input = {userId, quizId, players, playersCount: players.length, date: new Date()}
                
                const {data} = await instanceReports({
                    method: 'post',
                    data: input
                })
                redis.del('reports')
                return data
            }
            catch (err) {
                throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
            }
        },
        delReports: async(_, args) => {
            try {
                const id = args.id
                await instanceReports({
                    method: 'delete',
                    url: `/${id}`
                })
                redis.del('reports')
                return ({'message': 'Delete Item Success'})
            }
            catch (err) {
                if (err.response.status === 404) {
                    console.log('errrr');
                    throw new ApolloError('Report Not Found', 'NOT_FOUND')
                } 
                else {
                    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    }
}


module.exports = { typeDef, resolvers }