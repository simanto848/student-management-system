const db = require("../../config/dbConfig");
const CrudService = require("./CrudService");
const bcrypt = require("bcrypt");
const MailSender = require("../helpers/SendMail");
const { generateRandomString } = require("../helpers/string");
const { success, error } = require("./ResponseService");
const AuthService = require("./AuthService");
const tableName = "teachers";

const login = async (payload) => {
    return await AuthService.login(tableName, payload);
}

// SQL = SELECT teachers.id, teachers.name, teachers.email, teachers.password, faculties.short_name AS 'faculty_name', departments.short_name AS 'department_name' FROM teachers INNER JOIN faculties ON teachers.faculty_id = faculties.id INNER JOIN departments ON teachers.department_id = departments.id AND teachers.faculty_id = departments.faculty_id;
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

module.exports = {
    login,
    getAll,
    getByKeyword,
    store,
    update,
    destroy
}