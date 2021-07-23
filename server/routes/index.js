const routeReports = require('./routeReports')
const errorHandler = require('../middlewares/errorHandler')
const { app } = require('../app')
const router = require('express').Router()

router.use('/reports', routeReports)
router.use(errorHandler)

module.exports = router