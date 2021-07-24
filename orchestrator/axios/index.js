const axios = require('axios')

const axiosQuizzes = axios.create({
    baseURL: `http://localhost:4001/quizzes`
})

module.exports = {
    axiosQuizzes,
}