const axios = require('axios')

const instanceReports = axios.create({
  baseURL: 'http://localhost:4001/reports',
});

const instanceQuizzes = axios.create({
  baseURL: `http://localhost:4001/quizzes`
  // baseURL: `http://localhost:8080/quizzes` //jsonServer
})

const instanceUsers = axios.create({
  baseURL: `http://localhost:4001`
})


module.exports = {instanceReports, instanceQuizzes, instanceUsers}


