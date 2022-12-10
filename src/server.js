import express from 'express'
import cors from 'cors'
import routerCategories from './Routes/categories.routes.js'
import routesGames from './Routes/games.routes.js'
import customersRoutes from './Routes/customers.routes.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routerCategories)
app.use(routesGames)
app.use(customersRoutes)

const port = process.env.PORT || 4000
app.listen(4000, () => console.log(`Server running in port ${port}`))