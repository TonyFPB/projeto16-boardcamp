import { Router } from 'express'
import { getCustomers, getCustomersById, postCustomers, putCustomers } from '../Controllers/customers.controller.js'
import { customerIdValidate, customersCpfConflict, customersValidate } from '../Middlewares/customers.middleware.js'

const customersRoutes = Router()

customersRoutes.post('/customers', customersValidate, customersCpfConflict, postCustomers)
customersRoutes.get('/customers', getCustomers)

customersRoutes.get('/customers/:id', customerIdValidate, getCustomersById)
customersRoutes.put('/customers/:id',customersValidate,customerIdValidate,customersCpfConflict, putCustomers)

export default customersRoutes