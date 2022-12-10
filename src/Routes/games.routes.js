import { Router } from 'express'
import { getGames, postGame } from '../Controllers/games.controller.js'
import { gamesConflict, gamesValidate } from '../Middlewares/games.middleware.js'


const routesGames = Router()

routesGames.get('/games',getGames)
routesGames.post('/games',gamesValidate,gamesConflict,postGame)

export default routesGames