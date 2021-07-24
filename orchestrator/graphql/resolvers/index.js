const { ApolloError } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis')
const redis = new Redis()
const { axiosQuizzes } = require('../../axios')

const resolvers = {
    Query: {
        Quizzes: async () => {
            try {
                // redis.del('Quizzes')
                const QuizzesRedis = await redis.get('Quizzes')
                if (QuizzesRedis) {
                    // console.log(JSON.parse(QuizzesRedis));
                    return JSON.parse(QuizzesRedis)
                } else {
                    const dataQuizzes = await axiosQuizzes.get(`/`)
                    console.log(JSON.stringify(dataQuizzes.data));
                    redis.set('Quizzes', JSON.stringify(dataQuizzes.data))
                }
            } catch (err) {
                throw new ApolloError(err.response.data.message)
            }
        },
        QuizzesById: async (_, args) => {
            try {
                const QuizzesByIdRadis = await redis.get("QuizzesById")
                if (QuizzesByIdRadis) {
                    const data = JSON.parse(QuizzesByIdRadis);
                    // console.log(data._id);
                    // console.log(args.id, 'ini args');
                    if (data._id === args.id) {
                        // console.log('masuk');
                        return JSON.parse(QuizzesByIdRadis)
                    } else {
                        // console.log('else');
                        redis.del('QuizzesById')
                        const dataQuiz = await axiosQuizzes.get("/" + args.id)
                        redis.set('QuizzesById', JSON.stringify(dataQuiz.data))
                    }
                } else {
                    const dataQuiz = await axiosQuizzes.get("/" + args.id)
                    redis.set('QuizzesById', JSON.stringify(dataQuiz.data))
                }
            } catch (err) {
                throw new ApolloError(err.response.data.message)
            }
        }
    },
    Mutation: {
        DeleteQuizzesById: async (_, args) => {
            try {
                const DestroyQuiz = await axiosQuizzes.delete(`/${args.id}`)
                redis.del('Quizzes')
                return DestroyQuiz.data.message
            } catch (err) {
                console.log(err.response.data.message);
                throw new ApolloError(err.response.data.message)
            }
        },
        EditQuizzesById: async (_, args) => {
            try {
                const data = {
                    _id: args.id,
                    userId: args.userId,
                    questions: args.questions,
                    timer: args.timer,
                    mode: args.mode
                }
                console.log(data);
                const updateQuizzes = await axiosQuizzes.put(`/${args.id}`, data)
                // console.log(updateQuizzes.data, 'masuk');
                redis.del('Quizzes')
                return updateQuizzes.data
            } catch (err) {
                throw new ApolloError(err.response.data.message)
            }
        },
        AddQuizzesById: async (_, args) => {
            try {
                const data = {
                    userId: args.userId,
                    questions: args.questions,
                    timer: args.timer,
                    mode: args.mode
                }
                console.log(data);
                const postQuizzes = await axiosQuizzes.post(`/`, data)
                // console.log(postQuizzes.data, 'masuk');
                redis.del('Quizzes')
                return postQuizzes.data
            } catch (err) {
                // console.log('masuk');
                throw new ApolloError(err.response.data.message)
            }
        }
    }
}
module.exports = resolvers