const Joi = require('joi')
const { Status } = require('../../config/constants')

const ProductDataDTO = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    category: Joi.string().allow(null, '').optional().default(null),
    price: Joi.number().min(1).required(),
    discount: Joi.number().min(0).max(90).default(0),
    description:Joi.string().optional().default(null),
    brand:Joi.string().allow(null, '').optional().default(null),
    isFeatured: Joi.boolean().default(false),
    seller:Joi.string().allow(null, '').optional().default(null),
    status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
    images: Joi.string().allow(null,'').optional().default(null)
})

module.exports = ProductDataDTO;