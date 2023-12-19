const db = require("../../config/dbConfig");
const CrudService = require("./CrudService");
const { success, error } = require("./ResponseService");
const tableName = "session_courses";

const getById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT session_courses.id, session_courses.session_id, sessions.session, courses.id as course_id, courses.title, departments.id as department_id FROM session_courses INNER JOIN courses ON session_courses.course_id = courses.id INNER JOIN sessions ON session_courses.session_id = sessions.id INNER JOIN departments ON courses.department_id = departments.id WHERE session_courses.session_id = ?`, id, (err, result) => {
                if (err) {
                    reject(error(err));
                }
                resolve(success(`Successfully retrieved ${tableName}`, result));
            }
        );
    })
}

const store = async (payload) => {
    let queryValues = 'VALUES'
    queryValues += payload.course_id.map(item => {
        return `(${payload.session_id}, ${payload.department_id}, ${item})`
    })

    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO ${tableName} (session_id, department_id, course_id) ${queryValues}`,
            (err, result) => {
                console.log(err);
                if (err) {
                    reject(error(err));
                }
                resolve(success(`Successfully assigned courses to session`, result));
            }
        );
    });
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

const getSessionCourses = async (sessionId, departmentId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${tableName} WHERE session_id = ? AND department_id = ? `, [sessionId, departmentId], (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

const deleteSessionCourses = async (sessionId, departmentId, coursesId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${tableName} WHERE session_id = ? AND department_id = ? AND course_id NOT IN(?)`, [sessionId, departmentId, coursesId], (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

const getCoursesByCourseIds = async (sessionId, departmentId, coursesId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${tableName} WHERE session_id = ? AND department_id = ? AND course_id IN(?)`, [sessionId, departmentId, coursesId], (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

module.exports = {
    getById,
    store,
    getDepartmentCourses,
    getSessionCourses,
    deleteSessionCourses,
    getCoursesByCourseIds
}