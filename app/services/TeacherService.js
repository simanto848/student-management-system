const db = require("../../config/dbConfig");
const bcrypt = require("bcrypt");
const CrudService = require("./CrudService");
const MailSender = require("../helpers/SendMail");
const { generateRandomString } = require("../helpers/StringGenerator");
const { success, error } = require("./ResponseService");
const AuthService = require("./AuthService");
const tableName = "teachers";

const login = async (payload) => {
    return await AuthService.login(tableName, payload);
}

const getAll = async () => {
    return await CrudService.getAllByJoin("SELECT teachers.id, teachers.name, teachers.email, teachers.password, teachers.role, faculties.short_name AS 'faculty_name', departments.short_name AS 'department_name' FROM teachers INNER JOIN faculties ON teachers.faculty_id = faculties.id INNER JOIN departments ON teachers.department_id = departments.id");
}

const getByKeyword = async (keyword, id) => {
    return await CrudService.getByKeyword(tableName, keyword, id);
}

const store = async (payload) => {
    let password = generateRandomString(8)
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${tableName} set ?`, payload, (err, result) => {
            if (err) {
                reject(error(err));
            }
            MailSender.mail(payload.email, password);
            resolve(success("Successfully stored", result));
        });
    });
}

const update = async (id, payload) => {
    return await CrudService.update(tableName, id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy(tableName, id);
}

const getCourses = async (teacher_id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT courses.id AS course_id, courses.code AS course_code, courses.title AS course_title, courses.credit_hour, courses.semester, departments.short_name AS department_name, sessions.batch_no FROM session_courses INNER JOIN teachers ON session_courses.teacher_id = teachers.id INNER JOIN courses ON session_courses.course_id = courses.id INNER JOIN departments ON courses.department_id = departments.id INNER JOIN sessions ON session_courses.session_id = sessions.id WHERE session_courses.teacher_id = ?`, teacher_id, (err, result) =>{
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        })
    })
}

module.exports = {
    login,
    getAll,
    getByKeyword,
    store,
    update,
    destroy,
    getCourses
}