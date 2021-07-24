<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const routerQuiz = require('./quiz')


router.get('/', (req, res) => {
    res.send("home test");
})

router.use('/quizzes', routerQuiz)

=======
const routeReports = require('./routeReports')
const errorHandler = require('../middlewares/errorHandler')
const { app } = require('../app')
const router = require('express').Router()

router.use('/reports', routeReports)
router.use(errorHandler)
>>>>>>> development

module.exports = router