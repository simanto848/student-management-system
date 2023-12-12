const joi = require("joi")

const courseSchema = joi.object({
    title: joi.string().required(),
    code: joi.string().required(),
    credit_hour: joi.string().required(),
    semester: joi.string().required(),
    department_id: joi.number().required(),
    maintainable: joi.string().required(),
    // quantity: joi.number().integer().min(1).required(),
});

const departmentSchema = joi.object({
    short_name: joi.string().required(),
    faculty_id: joi.string().required()
});

const facultySchema = joi.object({});

const sessionSchema = joi.object({});

const teachersSchema = joi.object({});

const sessionCourseSchema = joi.object({});

const authSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
});

module.exports = {
    courseSchema,
    departmentSchema,
}