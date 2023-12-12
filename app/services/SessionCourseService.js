const db = require("../../config/dbConfig");
const CrudService = require("./CrudService");
const { success, error } = require("./ResponseService");
const tableName = "session_courses";

const getAll = async () => {
    return await CrudService.simpleGetAll();
}

const getByKeyword = async (keyword, value) => {
    return await CrudService.getByKeyword(tableName, keyword, value);
}

const store = async (payload) => {
    let queryValues = 'VALUES'
    queryValues += payload.course_id.map(item => {
        return `(${payload.session_id}, ${item})`
    })

    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO ${tableName} (session_id, course_id) ${queryValues}`,
            (err, result) => {
                if (err) {
                    reject(error(err));
                }
                resolve(success(`Successfully assigned courses to session`, result));
            }
        );
    });
}

const update = async (id, payload) => {
    return await CrudService.update(tableName, id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy(tableName, id);
}

module.exports = {
    getAll,
    getByKeyword,
    store,
    update,
    destroy
}