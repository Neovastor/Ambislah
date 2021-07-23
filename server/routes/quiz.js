const express = require('express')
const router = express.Router()
const Controller = require('../controllers/quizController')
const errorHandler = require('../middlewares/errorHandler')

router.get('/', Controller.getQuizHandler)

router.post('/', Controller.postQuizHandler)

router.get('/:id', Controller.getQuizByIdHandler)

router.put('/:id', Controller.putQuizHandler)

router.delete('/:id', Controller.deleteQuizHandler)

router.use(errorHandler)

module.exports = router