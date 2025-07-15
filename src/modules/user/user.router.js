const logInCheck = require('../../middlewares/auth.middleware')
const uploader = require('../../middlewares/file-parser.middleware')
const bodyValidator = require('../../middlewares/validator.middleware')
const authCtrl = require('../auth/auth.controller')
const { RegisterUserDTD } = require('../auth/auth.validator')
const userCtrl = require('./user.controller')

const userRouter = require('express').Router()

userRouter.post('/',logInCheck, uploader().single('image'),bodyValidator(RegisterUserDTD),authCtrl.userRegister)
userRouter.get('/', logInCheck, userCtrl.listAllUsers)

module.exports = userRouter