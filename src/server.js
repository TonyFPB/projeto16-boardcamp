import express from 'express'
import cors from 'cors'
import routerCategories from './Routes/categories.routes.js'
import routesGames from './Routes/games.routes.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use(routerCategories)
app.use(routesGames)


app.listen(4000, () => console.log('Server runnig in port 4000'))