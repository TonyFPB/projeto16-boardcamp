import dayjs from "dayjs";
import connection from "../Database/db.js";
import customersSchemas from "../Schemas/customers.schema.js";

export function customersValidate(req, res, next) {
    const customers = req.body

    const validation = customersSchemas.validate(customers, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map(d => d.message)
        return res.status(400).send({ message: errors })
    }
    res.locals = validation.value
    res.locals.birthday = dayjs(res.locals.birthday).format('YYYY-MM-DD')
    next()
}

export async function customersCpfConflict(req, res, next) {
    const customer = res.locals
    const { id } = req.params
    try {
        const customerExists = await connection.query("SELECT * FROM customers WHERE cpf=$1", [customer.cpf])
        if (id) {
            const customerExistsId = await connection.query("SELECT * FROM customers WHERE id=$1", [id])
            if(customerExistsId.rows[0].id !== customerExists.rows[0].id && customerExists.rows[0].cpf === customer.cpf){
                return res.sendStatus(409)
            }
        }
        if (!id && customerExists.rowCount > 0) {
            return res.sendStatus(409);
        }

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    console.log('passou')
    next()
}

export async function customerIdValidate(req, res, next) {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            return res.sendStatus(404)
        }
        const customer = await connection.query("SELECT * FROM customers WHERE id=$1;", [id])
        if (customer.rowCount === 0) {
            return res.sendStatus(404)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}