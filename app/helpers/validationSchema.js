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

const facultySchema = joi.object({
    short_name: joi.string().required(),
});

const sessionSchema = joi.object({
    session: joi.string().required(),
    batch_no: joi.string().required(),
    semester: joi.string().required()
});

const teachersSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    faculty_id: joi.string().required(),
    department_id: joi.string().required(),
    role: joi.string().required()
});

const sessionCourseSchema = joi.object({
    session_id: joi.number().required(),
    department_id: joi.number().required(),
    course_id: joi.required(),
});

const authSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required()
});

module.exports = {
    authSchema,
    courseSchema,
    departmentSchema,
    facultySchema,
    sessionSchema,
    teachersSchema,
    sessionCourseSchema,
}