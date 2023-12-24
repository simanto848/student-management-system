const SessionService = require("../../services/SessionService");
const TeacherService = require("../../services/TeacherService");
const DepartmentHeadService = require("../../services/DepartmentHeadService");

const index = async (req, res) => {
    try {
        const session = await SessionService.getAll();
        const teachers = await TeacherService.getAll();
        return res.render("teacher/departmentHead/create", { sessions: session.data, teachers: teachers.data, alertMessage: req.flash("message") })
    } catch (error) {
        return res.render("teacher/departmentHead/create", { alertMessage: req.flash("message") })
    }
}

const getDepartmentCourses = async (req, res) => {
    const { sessionId } = req.params;
    const department_id = req.session.teacher.department_id
    try{
        const response = await DepartmentHeadService.getDepartmentCourses(sessionId, department_id);
        return res.send(response);
    } catch (error) {
        return res.send({
            success: false,
            message: 'Failed to retrieve',
            data: null
        });
    }
};

const addCourseTeacher = async (req, res) => {
    try {
        const { session_id, course_id, session_course_id, teacher_id } = req.body;
        const department_id = req.session.teacher.department_id
        const { success, message, data } = await DepartmentHeadService.assign(session_id, department_id, course_id, session_course_id, teacher_id);

        if (!success) {
            req.flash('message', message)
            return res.redirect("/teacher/department-head/add-course-teacher")
        }
        req.flash('message', message)
        return res.redirect("/teacher/department-head/add-course-teacher")
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

module.exports = {
    index,
    addCourseTeacher,
    getDepartmentCourses
}