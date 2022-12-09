import connection from "../Database/db.js";
import gamesSchemas from "../Schemas/games.schemas.js";

export async function gamesValidate(req, res, next) {
    const game = req.body

    try {
        const validation = gamesSchemas.validate(game, { abortEarly: false })
        if (validation.error) {
            const errors = validation.error.details.map(d => d.message)
            return res.status(400).send({ message: errors })
        }

        const idCategoryExist = await connection.query('SELECT * FROM categories WHERE id=$1', [game.categoryId])
        if (!idCategoryExist.rowCount) {
            return res.status(400).send({ message: 'A categoria nao existe.' })
        }
        
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

export async function gamesConflict(req,res,next){
    const {name} = req.body
    try{
        const gameExist = await connection.query('SELECT * FROM games WHERE name=$1',[name])
        if(gameExist.rowCount){
            return res.sendStatus(409)
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
    next()
}