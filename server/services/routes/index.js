const express = require('express')
const router = express.Router()
const routerQuizzes = require('./quizRoutes')
const routeReports = require('./reportRoutes')
const errorHandler = require('../middlewares/errorHandler')


router.get('/', (req, res) => {
    res.send("home test");
})

router.use('/quizzes', routerQuizzes)

router.use('/reports', routeReports)

router.use(errorHandler)

module.exports = router