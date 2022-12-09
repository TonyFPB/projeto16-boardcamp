import connection from "../Database/db.js"

export async function postCategorie(req,res){
    const {name} = req.body
    try{
        await connection.query('INSERT INTO categories (name) VALUES ($1)',[name])
        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}