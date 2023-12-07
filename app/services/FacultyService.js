const db = require("../../config/dbConfig");
const CrudService = require("./CrudService")

const getAll = async () => {
    return await CrudService.simpleGetAll("faculties");
}

const getByKeyword = async (keyword, value) => {
    return await CrudService.getByKeyword("faculties", keyword, value);
}

const store = async (payload) => {
    return await CrudService.store("faculties", payload);
}

const update = async (id, payload) => {
    return await CrudService.update("faculties", id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy("faculties", id);
}

module.exports = {
    getAll,
    store,
    getByKeyword,
    update,
    destroy
}