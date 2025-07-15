
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
authRouter.get('/activate/:token',(req,res,next)=>{
    console.log('I am router level middleware')   // runs only inside this router
    next()
},
authCtrl.activateRegisteredUser)

// login
authRouter.post('/login',bodyValidator(LoginDTO),authCtrl.loginUser)

authRouter.get('/user/:userId',authCtrl.getUserProfileByUserId)


// private
authRouter.get('/me',logInCheck,authCtrl.getLoggedInUser)
authRouter.put('/me',logInCheck,authCtrl.updateMyProfile)
authRouter.get('/logout',logInCheck,authCtrl.logoutUser)

// forget password
    // post ===> URL ==> /forgot-password ===> forgotPasswordRequest
authRouter.post('/forgotPassword',authCtrl.forgotPasswordRequest)



module.exports = authRouter;