const axios = require('axios')

const instanceReports = axios.create({
    baseURL: 'http://localhost:4001/reports',
  });

module.exports = {instanceReports}