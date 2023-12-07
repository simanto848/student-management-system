const db = require("../../config/dbConfig");
const CrudService = require("./CrudService");
const bcrypt = require("bcrypt");
const { success, error } = require("./ResponseService");

// SQL = SELECT teachers.id, teachers.name, teachers.email, teachers.password, faculties.short_name AS 'faculty_name', departments.short_name AS 'department_name' FROM teachers INNER JOIN faculties ON teachers.faculty_id = faculties.id INNER JOIN departments ON teachers.department_id = departments.id AND teachers.faculty_id = departments.faculty_id;
const getAll = async () => {
    return await CrudService.getAllByJoin("SELECT teachers.id, teachers.name, teachers.email, teachers.password, teachers.role, faculties.short_name AS 'faculty_name', departments.short_name AS 'department_name' FROM teachers INNER JOIN faculties ON teachers.faculty_id = faculties.id INNER JOIN departments ON teachers.department_id = departments.id");
}

const getByKeyword = async (id) => {
    return await CrudService.getByKeyword("teachers", "id", id);
}

const store = async (payload) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO teachers set ?`, payload, (err, result) => {
            if (err) {
                reject(error(err));
            }
            resolve(success("Successfully stored", result));
        });
    });
}

const update = async (id, payload) => {
    return await CrudService.update("teachers", id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy("teachers", id);
}

module.exports = {
    getAll,
    getByKeyword,
    store,
    update,
    destroy
}