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
    try {
        if (customerId && gameId) {
            const rentals = await connection.query(`
                SELECT rentals.*,rentals."rentDate"::text,rentals."returnDate"::text,
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
                WHERE rentals."customerId"=$1 AND rentals."gameId"=$2
                ORDER BY rentals.id`, [customerId, gameId])
            return res.send(rentals.rows)
        } if (customerId) {
            const rentals = await connection.query(`
                SELECT rentals.*,rentals."rentDate"::text,rentals."returnDate"::text,
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
                WHERE rentals."customerId"=$1
                ORDER BY rentals.id`, [customerId])
            return res.send(rentals.rows)
        } if (gameId) {
            const rentals = await connection.query(`
                SELECT rentals.*,rentals."rentDate"::text,rentals."returnDate"::text,
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
                WHERE rentals."gameId"=$1
                ORDER BY rentals.id`, [gameId])
            return res.send(rentals.rows)
        }

        const rentals = await connection.query(`
            SELECT rentals.*,rentals."rentDate"::text,rentals."returnDate"::text,
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
            ORDER BY rentals.id`)
        res.send(rentals.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function postRentalReturn(req, res) {
    const { id } = req.params
    const { rentDate, daysRented, originalPrice } = res.locals
    const difference = dayjs().diff(rentDate, 'day')
    try {
        const returnDate = dayjs().format('YYYY-MM-DD')
        if(difference>daysRented){
            const delayFee = (originalPrice/daysRented)*(difference-daysRented)
            await connection.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;`,[returnDate,delayFee,id])
            return res.sendStatus(200)
        }
        await connection.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;`,[returnDate,0,id])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function deleteRental(req,res){
    const {id} = req.params
    try{
        await connection.query("DELETE FROM rentals WHERE id=$1",[id])
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}