const express = require('express')
const router = express.Router()
const Controller = require('../controllers/quizController')
const toImageKit = require('../middlewares/toImageKit')
const upload = require('../middlewares/multer');

router.get('/', Controller.getQuizHandler)

router.post('/',upload.single('file'), toImageKit, Controller.postQuizHandler)

router.post('/challenge', Controller.postChallenge)//create offline room

router.get('/:id', Controller.getQuizByIdHandler)

router.put('/:id', Controller.putQuizHandler)

router.delete('/:id', Controller.deleteQuizHandler)



module.exports = router