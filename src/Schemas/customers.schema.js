import Joi from 'joi'
import dayjs from 'dayjs'
const customersSchemas = Joi.object({
    name: Joi.string().trim().required(),
    phone: Joi.string().min(10).max(11).pattern(/^[0-9]+$/, 'numbers').required(),
    cpf: Joi.string().min(11).max(11).pattern(/^[0-9]+$/, 'numbers').required(),
    birthday: Joi.date().less(dayjs().year(dayjs().year()-18).format('YYYY-MM-DD')).required()
})
export default customersSchemas