const router = require('express').Router()
const ControllerReports = require('../controllers/controllerReports')

router.get('/', (req, res) => {
    res.status(200).json('ok')
})

router.get('/reports', ControllerReports.findAllReports)
router.get('/reports/:id', ControllerReports.findOneReports)
router.post('/reports', ControllerReports.createReports)
router.delete('/reports/:id', ControllerReports.findOneReports)

module.exports = router