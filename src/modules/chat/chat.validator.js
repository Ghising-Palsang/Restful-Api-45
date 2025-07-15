const Joi = require('joi')

const NewChatDTO = Joi.object({
    receiver: Joi.string().required(),
    message: Joi.string().min(1).max(250).required()
})

module.exports = NewChatDTO