import {
    rentalDaysValidate,
    rentalsCustomerValidate,
    rentalsGameValidate,
    rentalsValidate
} from '../Middlewares/rentals.middleware.js'
import { Router } from 'express'
import { getRentals, postRental } from '../Controllers/rentals.controller.js'

const rentalsRoutes = Router()

rentalsRoutes.get('/rentals', getRentals)

rentalsRoutes.post('/rentals', rentalsValidate, rentalsCustomerValidate, rentalsGameValidate, rentalDaysValidate, postRental)

rentalsRoutes.post('/rentals/:id/return')

rentalsRoutes.delete('/rentals/:id')

export default rentalsRoutes