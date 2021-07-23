const express = require('express')
const router = express.Router()
const routerQuiz = require('./quiz')


router.get('/', (req, res) => {
    res.send("home test");
})

router.use('/quizzes', routerQuiz)


module.exports = router