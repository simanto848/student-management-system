const joi = require("joi")

const courseSchema = joi.object({
    title: joi.string().required(),
    code: joi.string().required(),
    credit_hour: joi.string().required(),
    semester: joi.string().required(),
    department_id: joi.number().required(),
    maintainable: joi.string().required(),
    // quantity: joi.number().integer().min(1).required(),
})

module.exports = {
    courseSchema
}