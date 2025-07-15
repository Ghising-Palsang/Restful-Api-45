const Joi = require('joi')

const orderDetailDTO = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().min(1).max(10).required()
})

module.exports = orderDetailDTO;