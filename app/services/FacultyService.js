const db = require("../../config/dbConfig");
const CrudService = require("./CrudService")
const { success, error } = require("./ResponseService");
const tableName = 'faculties'

const getAll = async () => {
    return await CrudService.simpleGetAll(tableName);
}

const getByKeyword = async (keyword, value) => {
    return await CrudService.getByKeyword(tableName, keyword, value);
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

const getDepartments = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM departments WHERE faculty_id = ?`, id, (err, result) => {
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
    store,
    getByKeyword,
    update,
    destroy,
    getDepartments
}