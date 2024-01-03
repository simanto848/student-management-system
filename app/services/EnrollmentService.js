const CrudService = require("./CrudService");
const tableName = "student_enrollments"

const getByKeyword = async (keyword, value) => {
    return await CrudService.getByKeyword(tableName, keyword, value);
}

const store = async (payload) => {
    const date = new Date();
    const transcation_id = date.getTime();
    payload.transcation_id = transcation_id
    return await CrudService.store(tableName, payload);
}

module.exports = {
    getByKeyword,
    store,
}