import connection from "../Database/db.js"
import rentalsSchemas from "../Schemas/rentals.schema.js"

export function rentalsValidate(req, res, next) {
    const rental = req.body

    const validation = rentalsSchemas.validate(rental, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map(d => d.message)
        return res.status(400).send({ message: errors })
    }
    next()
}

export async function rentalsCustomerValidate(req, res, next) {
    const { customerId } = req.body
    try {
        const customerExist = await connection.query("SELECT * FROM customers WHERE id=$1", [customerId])
        if (customerExist.rowCount === 0) {
            return res.status(400).send({ message: "Usuario nao existente." })
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

export async function rentalsGameValidate(req, res, next) {
    const { gameId, daysRented } = req.body
    try {
        const gameExist = await connection.query("SELECT * FROM games WHERE id=$1", [gameId])
        if (gameExist.rowCount === 0) {
            return res.status(400).send({ message: "Jogo nao existente." })
        }

        req.originalPrice = gameExist.rows[0].pricePerDay * daysRented
        req.stockTotal = gameExist.rows[0].stockTotal
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

export async function rentalDaysValidate(req, res, next) {
    const { stockTotal } = req
    const { gameId } = req.body
    try {
        const existingRentals = await connection.query('SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS null', [gameId])
        if (existingRentals.rowCount >= stockTotal) {
            return res.status(400).send({ message: "Aluguel indeisponivel" })
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

export async function rentalReturnValidate(req, res, next) {
    const { id } = req.params
    try {
        if(isNaN(id)){
            return res.sendStatus(400)
        }
        const rentalExist = await connection.query('SELECT * FROM rentals WHERE id=$1', [id])
        if(rentalExist.rowCount === 0 || rentalExist.rows[0].returnDate){
            return res.sendStatus(400)
        }
        res.locals = rentalExist.rows[0]
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}