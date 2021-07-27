const axios = require('axios')

const instanceReports = axios.create({
    baseURL: 'http://localhost:4001/reports',
  });

const instanceQuizzes = axios.create({
    baseURL: `http://localhost:4001/quizzes`
})


module.exports = {instanceReports, instanceQuizzes}


