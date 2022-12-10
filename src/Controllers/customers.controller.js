import dayjs from "dayjs";
import connection from "../Database/db.js";

export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = res.locals
    console.log(birthday)
    try {
        await connection.query("INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4);", [name, phone, cpf, birthday])
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getCustomers(req, res) {
    const { cpf } = req.query
    try {
        if (cpf) {
            const customers = await connection.query("SELECT * FROM customers WHERE cpf LIKE $1 ORDER BY id;", [`${cpf}%`])
            return res.send(customers.rows.map(c => { return { id: c.id, name: c.name, phone: c.phone, cpf: c.cpf, birthday: dayjs(c.birthday).format('YYYY-MM-DD') } }))
        }
        const customers = await connection.query("SELECT * FROM customers ORDER BY id;")
        res.send(customers.rows.map(c => { return { id: c.id, name: c.name, phone: c.phone, cpf: c.cpf, birthday: dayjs(c.birthday).format('YYYY-MM-DD') } }))
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getCustomersById(req, res) {
    const { id } = req.params

    try {
        console.log(id)
        const customers = await connection.query("SELECT * FROM customers WHERE id=$1;", [id])
        res.send({ ...customers.rows[0], birthday: dayjs(customers.rows[0].birthday).format('YYYY-MM-DD') })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function putCustomers(req, res) {
    const { name, phone, cpf, birthday } = res.locals
    const { id } = req.params
    try {
        await connection.query("UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5;", [name, phone, cpf, birthday, id])
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}