import dayjs from "dayjs";
import connection from "../Database/db.js";
import customersSchemas from "../Schemas/customers.schema.js";

export function customersValidate(req,res,next){
    const customers = req.body

    const validation = customersSchemas.validate(customers, {abortEarly:false})
    if(validation.error){
        const errors = validation.error.details.map(d=>d.message)
        return res.status(400).send({message:errors})
    }
    res.locals = validation.value
    res.locals.birthday = dayjs(res.locals.birthday).format('YYYY-MM-DD')
    
    next()
}

export async function customersConflict(req,res,next){
    const customer = res.locals
    try{
        const customerExists = await connection.query("SELECT * FROM customers WHERE cpf=$1",[customer.cpf])
        
        if(customerExists.rowCount){
            return res.sendStatus(409);
        }
        console.log('passei')

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
    next()
}