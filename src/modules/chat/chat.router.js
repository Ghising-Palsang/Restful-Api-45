const logInCheck = require('../../middlewares/auth.middleware')
const bodyValidator = require('../../middlewares/validator.middleware')
const chatCtrl = require('./chat.controller')
const NewChatDTO = require('./chat.validator')

const chatRouter = require('express').Router()

chatRouter.post('/send',logInCheck, bodyValidator(NewChatDTO), chatCtrl.storeChat)
chatRouter.get('/:userId', logInCheck, chatCtrl.getChatDetail )

module.exports = chatRouter