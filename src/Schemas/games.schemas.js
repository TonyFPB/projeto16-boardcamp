import Joi from 'joi'

const gamesSchemas = Joi.object({
    "name":Joi.string().required(),
    "image":Joi.string().required(),
    "stockTotal":Joi.number().integer().positive().required(),
    "categoryId":Joi.number().integer().required(),
    "pricePerDay":Joi.number().integer().positive().required()
})

export default gamesSchemas