const router = require('express').Router()
const ControllerReports = require('../controllers/controllerReports')

// router.get('/', (req, res) => {
//     res.status(200).json('ok')
// })

router.get('/', ControllerReports.findAllReports)
router.get('/:id', ControllerReports.findOneReports)
router.post('/', ControllerReports.createReports)
router.delete('/:id', ControllerReports.findOneReports)

module.exports = router