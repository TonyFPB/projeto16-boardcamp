import connection from "../Database/db.js"


export async function postGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body
    try {
        await connection.query(`INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") 
        VALUES ($1,$2,$3,$4,$5)`, [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getGames(req, res) {
    const { name } = req.query
    try {
        if (name) {
            const games = await connection.query(`SELECT games.*,categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE LOWER(games.name) LIKE $1;`,[`${name.toLowerCase()}%`])
            return res.send(games.rows);
        }
        const games = await connection.query('SELECT games.*,categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;')
        return res.send(games.rows)
    } catch (err) { 
        console.log(err) 
        res.sendStatus(500)
    }
}