const Joi = require('joi')
const { Status } = require('../../config/constants')

const BannerCreateDTO = Joi.object({
    title: Joi.string().min(3).max(150).required(),
    url: Joi.string().allow(null,'').optional().default(null),
    status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
    image: Joi.string().allow(null,'').optional().default(null)
})

module.exports = BannerCreateDTO