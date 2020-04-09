const router = require('@feathersjs/express').Router()

router.use('/api', require('./ideaRoutes.js'))

module.exports = router