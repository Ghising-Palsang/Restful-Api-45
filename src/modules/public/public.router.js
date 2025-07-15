const publicRouter = require('express').Router()
const publicCtrl = require('../public/public.controller')

publicRouter.get('/', publicCtrl.notifyUser)

publicRouter.get('/about-us',publicCtrl.aboutUs)



module.exports = publicRouter;