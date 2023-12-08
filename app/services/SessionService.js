const CrudService = require("./CrudService");
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

module.exports = {
    getAll,
    getByKeyWord,
    store,
    update,
    destroy
}