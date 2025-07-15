const Joi = require('joi')
const { Status } = require('../../config/constants')

const CategoryDataDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    parentId: Joi.string().allow(null, '').optional().default(null),
    isFeatured: Joi.boolean().default(false),
    inMenu: Joi.boolean().default(false),
    status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
    image: Joi.string().allow(null,'').optional().default(null)
})

module.exports = CategoryDataDTO;