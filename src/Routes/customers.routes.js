import { Router } from 'express'
import { postCustomers } from '../Controllers/customers.controller.js'
import { customersConflict, customersValidate } from '../Middlewares/customers.middleware.js'

const customersRoutes = Router()


customersRoutes.post('/customers', customersValidate, customersConflict, postCustomers)

// customersRoutes.get('/customers', getCustomers)

// customersRoutes.get('/customers/:id')

// customersRoutes.put('/customers/:id')

export default customersRoutes