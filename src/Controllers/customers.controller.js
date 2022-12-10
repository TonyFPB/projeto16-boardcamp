import connection from "../Database/db.js";

export async function postCustomers(req,res){
    const {name,phone,cpf,birthday} = res.locals
    console.log(birthday)
    try{
        await connection.query("INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4);",[name,phone,cpf,birthday])
        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

// export async function getCustomers(req,res){
//     try{
//         const customers = await connection.query("SELECT * FROM customers DATE;")
//         res.send(customers.rows)
//     }catch(err){
//         console.log(err)
//         res.sendStatus(500)
//     }
// }