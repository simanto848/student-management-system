const db = require("../../config/dbConfig");
const CrudService = require("./CrudService");
const { success, error } = require("./ResponseService");
const tableName = "sessions"

const getAll = async () => {
    return await CrudService.simpleGetAll(tableName);
}

const getByKeyWord = async (keyword, id) => {
    return await CrudService.getByKeyword(tableName, keyword, id);
}

const store = async (payload) => {
    return await CrudService.store(tableName, payload);
}

const update = async (id, payload) => {
    return await CrudService.update(tableName, id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy(tableName, id);
}

const getCourses = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT courses.id, courses.code AS course_code, courses.title AS course_title, courses.credit_hour FROM session_courses INNER JOIN courses ON session_courses.course_id = courses.id WHERE session_courses.session_id = ?`, id, (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

module.exports = {
    getAll,
    getByKeyWord,
    store,
    update,
    destroy,
    getCourses
}