import dayjs from "dayjs"
import connection from "../Database/db.js"

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const { originalPrice } = req
    const rentDate = dayjs().format("YYYY-MM-DD")

    try {
        await connection.query(`INSERT INTO rentals 
        ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
        VALUES ($1,$2,$3,$4,$5,$6,$7);
        `, [customerId, gameId, rentDate, daysRented, null, originalPrice, null])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query
    try{
        if(customerId && gameId){
            
        }if(customerId){
            
        }if(gameId){
            
        }
        
        const rentals = await connection.query(`
        SELECT rentals.*,
        json_build_object('id',games.id,'name',games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game,
        json_build_object('id',customers.id,'name',customers.name) AS customer 
        FROM 
        rentals 
        JOIN 
        "customers" 
        ON 
        rentals."customerId"=customers.id 
        JOIN 
        games 
        ON 
        rentals."gameId" = games.id
        JOIN 
        categories
        ON
        games."categoryId" = categories.id
        `)
        res.send(rentals.rows)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}