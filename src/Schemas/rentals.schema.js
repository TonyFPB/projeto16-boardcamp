import Joi from 'joi'

const rentalsSchemas = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().integer().positive().required()
})

export default rentalsSchemas