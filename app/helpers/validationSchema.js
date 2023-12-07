const joi = require("joi")

const postSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    description: joi.string().required(),
    language: joi.string().required(),
    pages: joi.number().required(),
    condition: joi.string().required(),
    weight: joi.number().required(),
    quantity: joi.number().integer().min(1).required(),
    price: joi.number().integer().required(),
    keyword: joi.string().required(),
    category: joi.number().required()
})

module.exports = {
    postSchema
}