import connection from "../Database/db.js"


export async function postGame(req,res){
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body
    try{
        await connection.query(`INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") 
        VALUES ($1,$2,$3,$4,$5)`,[name,image,stockTotal,categoryId,pricePerDay])
        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}