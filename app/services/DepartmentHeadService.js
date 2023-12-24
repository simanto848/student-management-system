const CrudService = require("./CrudService");
const db = require("../../config/dbConfig");
const { success, error } = require("./ResponseService");


// SELECT session_courses.id, session_courses.session_id, sessions.session, courses.code AS course_code, courses.id as course_id, courses.title AS course_title, departments.id as department_id FROM session_courses INNER JOIN courses ON session_courses.course_id = courses.id INNER JOIN sessions ON session_courses.session_id = sessions.id INNER JOIN departments ON courses.department_id = departments.id WHERE session_courses.session_id = ? AND courses.department_id = ?
const getDepartmentCourses = async (session_id, department_id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT session_courses.id, session_courses.session_id, sessions.session, session_courses.teacher_id, courses.code AS course_code, courses.id as course_id, courses.title AS course_title, departments.id as department_id FROM session_courses INNER JOIN courses ON session_courses.course_id = courses.id INNER JOIN sessions ON session_courses.session_id = sessions.id INNER JOIN departments ON courses.department_id = departments.id WHERE session_courses.session_id = ? AND courses.department_id = ?`, [session_id, department_id], (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

const assign = (session_id, department_id, course_id, session_course_id, teacher_id) => {
    let queryValues = 'VALUES'
    session_course_id.forEach((item, index) => {
        if(teacher_id[index] && course_id[index]) {
            if(queryValues != 'VALUES') {
                queryValues += ","
            }
            queryValues += `(${item}, ${session_id}, ${department_id}, ${course_id[index]}, ${teacher_id[index]})`
        }
    })

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO session_courses (id,session_id,department_id,course_id,teacher_id) ${queryValues}
        ON DUPLICATE KEY UPDATE session_id=VALUES(session_id),department_id=VALUES(department_id),course_id=VALUES(course_id),teacher_id=VALUES(teacher_id)`, (err, result) => {
            if (err) {
                console.log(err);
                reject(error(err));
            }
            resolve(success("Successfully updated", result));
        });
    });
}

module.exports = {
    getDepartmentCourses,
    assign
};
