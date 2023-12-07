const db = require("../../config/dbConfig");
const CrudService = require("./CrudService");

// SQL = SELECT teachers.id, teachers.name, teachers.email, teachers.password, faculties.short_name AS 'faculty_name', departments.short_name AS 'department_name' FROM teachers INNER JOIN faculties ON teachers.faculty_id = faculties.id INNER JOIN departments ON teachers.department_id = departments.id AND teachers.faculty_id = departments.faculty_id;
const getAll = async () => {
    return await CrudService.getAllByJoin("SELECT teachers.id, teachers.name, teachers.email, teachers.password, teachers.role, faculties.short_name AS 'faculty_name', departments.short_name AS 'department_name' FROM teachers INNER JOIN faculties ON teachers.faculty_id = faculties.id INNER JOIN departments ON teachers.department_id = departments.id");
}

module.exports = {
    getAll,
}