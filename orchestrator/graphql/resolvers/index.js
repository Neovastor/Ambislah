const { ApolloError } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis')
const redis = new Redis()
const { axiosQuizzes } = require('../../utils/axios')

const resolvers = {
    Query: {
        Quizzes: async () => {
            try {
                const QuizzesRedis = await redis.get('Quizzes')
                if (QuizzesRedis) {
                    // console.log(JSON.parse(QuizzesRedis));
                    return JSON.parse(QuizzesRedis)
                } else {
                    const Quizzes = await axiosQuizzes.get(`/`)
                    console.log(JSON.stringify(Quizzes.data));
                    redis.set('Quizzes', JSON.stringify(Quizzes.data))
                }
            } catch (err) {
                throw new ApolloError(err)
            }
        },
        QuizzesById: async (_, args) => {
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
        }
    }
}
module.exports = resolvers