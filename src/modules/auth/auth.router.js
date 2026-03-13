
const authRouter = require('express').Router()
const logInCheck = require('../../middlewares/auth.middleware')
const uploader = require('../../middlewares/file-parser.middleware')
const bodyValidator = require('../../middlewares/validator.middleware')
const authCtrl = require('../auth/auth.controller')
const {RegisterUserDTD, LoginDTO} = require('./auth.validator')



//register
authRouter.post('/register',uploader().single('image'),bodyValidator(RegisterUserDTD),authCtrl.userRegister)

// activate user
    // get ==> URL ==> /activate/:token ===> activateUser
authRouter.get('/activate/:token',authCtrl.activateRegisteredUser)

// login
authRouter.post('/login',bodyValidator(LoginDTO),authCtrl.loginUser)

authRouter.get('/user/:userId',authCtrl.getUserProfileByUserId)



// private
authRouter.get('/me',logInCheck,authCtrl.getLoggedInUser)
authRouter.put('/me',logInCheck,authCtrl.updateMyProfile)
authRouter.post('/logout',logInCheck,authCtrl.logoutUser)
authRouter.get('/listOfUsers', logInCheck, authCtrl.listOfUsers)

// forget password
    // post ===> URL ==> /forgot-password ===> forgotPasswordRequest
authRouter.post('/forgotPassword',authCtrl.forgotPasswordRequest)



module.exports = authRouter;   