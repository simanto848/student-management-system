const SessionService = require("../../services/SessionService");
const TeacherService = require("../../services/TeacherService");

/* 
Session Semester Batch
CSE-111 - Computer Basics - Teachers dropdown
CSE-111 - Computer Basics - Teachers dropdown
*/
const index = async (req, res) => {
    try {
        const session = await SessionService.getAll();
        const teacher = await TeacherService.getAll();
        return res.render("teacher/departmentHead/create", { sessions: session.data, teachers: teacher.data,alertMessage: req.flash("message") })
    } catch (error) {
        return res.render("teacher/departmentHead/create", { alertMessage: req.flash("message") })
    }
}

const addSessionTeacher = async (req, res) => {
    try {
        const { session_id, teacher_id } = req.body;
        // Perform the update logic using your TeacherService
        const result = await TeacherService.updateSessionCourseTeacher(session_id, teacher_id);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    index,
    addSessionTeacher
}