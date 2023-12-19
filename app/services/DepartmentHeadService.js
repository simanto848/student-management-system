const CrudService = require("./CrudService");
const db = require("../../config/dbConfig");

const getAll = async () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT session_courses.id, session_courses.session_id, sessions.session, courses.id as course_id, courses.title, departments.id as department_id FROM session_courses INNER JOIN courses ON session_courses.course_id = courses.id INNER JOIN sessions ON session_courses.session_id = sessions.id INNER JOIN departments ON courses.department_id = departments.id WHERE session_courses.session_id = ? AND courses.department_id = ?`, (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

module.exports = {
    addSessionCourse
};
