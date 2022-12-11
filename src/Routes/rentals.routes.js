import {
    rentalDaysValidate,
    rentalReturnValidate,
    rentalsCustomerValidate,
    rentalsGameValidate,
    rentalsValidate
} from '../Middlewares/rentals.middleware.js'
import { Router } from 'express'
import { getRentals, postRental, postRentalReturn } from '../Controllers/rentals.controller.js'

const rentalsRoutes = Router()

rentalsRoutes.get('/rentals', getRentals)

rentalsRoutes.post('/rentals', rentalsValidate, rentalsCustomerValidate, rentalsGameValidate, rentalDaysValidate, postRental)

rentalsRoutes.post('/rentals/:id/return',rentalReturnValidate, postRentalReturn)

rentalsRoutes.delete('/rentals/:id')

export default rentalsRoutes