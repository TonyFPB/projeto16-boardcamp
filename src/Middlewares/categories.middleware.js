import connection from "../Database/db.js";
import categoriesSchemas from '../Schemas/categories.schema.js'

export async function categoriesConflict(req,res,next){
    const {name} = req.body
    try{
        const categorieExist = await connection.query(`SELECT * FROM categories WHERE name=$1`,[name])
        if(categorieExist.rows.length>0){
            console.log(categorieExist.rows)
            return res.sendStatus(409)
        }
        console.log('passando por conflito')
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

export function categoriesValidate(req, res, next) {
    const categorie = req.body
    const validation = categoriesSchemas.validate(categorie, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map(d => d.message)
        return res.status(400).send({ message: errors })
    }
    console.log('passando por schema')
    next()
}