const Joi = require('joi')

const CheckOutDTO = Joi.object({
    details: Joi.array().items(Joi.string()).required(),
})

module.exports = CheckOutDTO;