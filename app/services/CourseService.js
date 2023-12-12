const CrudService = require("./CrudService");
const tableName = "courses";

const getAll = async () => {
    return await CrudService.simpleGetAll(tableName);
}

const getAllByJoin = async () => {
    return await CrudService.getAllByJoin('SELECT courses.id, courses.code, courses.title, courses.credit_hour, courses.semester, courses.maintainable, courses.created_at, courses.department_id, departments.short_name AS department_name FROM courses INNER JOIN departments ON courses.department_id = departments.id');
}

const store = async (payload) => {
    return await CrudService.store(tableName, payload);
}

const getByKeyword = async (keyword, value) => {
    return await CrudService.getByKeyword(tableName, keyword, value);
}

const update = async (id, payload) => {
    return await CrudService.update(tableName, id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy(tableName, id);
}

module.exports = {
    getAll,
    getAllByJoin,
    getByKeyword,
    store,
    update,
    destroy
}