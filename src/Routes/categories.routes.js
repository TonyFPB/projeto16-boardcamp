import { Router } from "express";
import {categoriesConflict, categoriesValidate} from "../Middlewares/categories.middleware.js"
import { getCategories, postCategorie } from "../Controllers/categories.controller.js";
const routerCategories = Router()

routerCategories.get('/categories', getCategories)

routerCategories.post('/categories', categoriesValidate, categoriesConflict, postCategorie)


export default routerCategories