const db = require("../../config/dbConfig");
const CrudService = require("./CrudService")
const { success, error } = require("./ResponseService");
const tableName = "departments";

const getAll = async () => {
    return await CrudService.getAllByJoin("SELECT departments.id, departments.short_name, faculties.short_name AS 'faculty_name' FROM departments INNER JOIN faculties ON departments.faculty_id=faculties.id");
};

const getByKeyword = async (keyword, value) => {
    return await CrudService.getByKeyword(tableName, keyword, value);
}

const store = async (payload) => {
    return await CrudService.store(tableName, payload);
};

const update = async (id, payload) => {
    return await CrudService.update(tableName, id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy(tableName, id);
}

const getDepartmentCourses = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM courses WHERE department_id = ?`, id, (err, result) => {
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
    getByKeyword,
    store,
    update,
    destroy,
    getDepartmentCourses
}