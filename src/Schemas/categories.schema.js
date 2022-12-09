import Joi from "joi";

const categoriesSchemas = Joi.object({
    'name':Joi.string().required()
})
export default categoriesSchemas