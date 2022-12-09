import { Router } from "express";
import {categoriesConflict, categoriesValidate} from "../Middlewares/categories.middleware.js"
import { postCategorie } from "../Controllers/categories.controller.js";
const routerCategories = Router()

routerCategories.get('/categories', (req, res) => { })

routerCategories.post('/categories', categoriesValidate, categoriesConflict, postCategorie)


export default routerCategories