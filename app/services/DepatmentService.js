const db = require("../../config/dbConfig");
const CrudService = require("./CrudService")

const getAll = async () => {
    return await CrudService.getAllByJoin("SELECT departments.id, departments.short_name, faculties.short_name AS 'faculty_name' FROM departments INNER JOIN faculties ON departments.faculty_id=faculties.id");
};

const getByKeyword = async (keyword, value) => {
    return await CrudService.getByKeyword("departments", keyword, value);
}

const store = async (payload) => {
    return await CrudService.store("departments", payload);
};

const update = async (id, payload) => {
    return await CrudService.update("departments", id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy("departments", id);
}

module.exports = {
    getAll,
    getByKeyword,
    store,
    update,
    destroy
}