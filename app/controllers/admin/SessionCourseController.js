const SessionCourseService = require("../../services/SessionCourseService");
const DepartmentService = require("../../services/DepatmentService");
const SessionService = require("../../services/SessionService");
const { sessionCourseSchema } = require("../../helpers/validationSchema");

const index = async (req, res) => {
    const { success, message, data } = await SessionService.getAll();
    res.render("admin/sessionCourses/index", { sessions: success ? data: [], alertMessage: req.flash('message')});
}

const create = async (req, res) => {
    const sessions = await SessionService.getAll();
    const departments = await DepartmentService.getAll();
    res.render("admin/sessionCourses/create", { sessions: sessions.data, departments: departments.data, alertMessage: req.flash('message') });
}

const store = async(req, res) => {
    try {
        const { error, value } = await sessionCourseSchema.validateAsync(req.body, { abortEarly: true });
        if (!error) {
            const { session_id, department_id, course_id } = req.body;
            await SessionCourseService.deleteSessionCourses(session_id, department_id, course_id);
            const sessionCourses = await SessionCourseService.getCoursesByCourseIds(session_id, department_id, course_id);
            if(sessionCourses.success) {
                const existingCourseIds = sessionCourses.data.map(item => item.course_id)
                const newCourses = course_id.filter(item => !existingCourseIds.includes(parseInt(item)))
                const { success, message, data } = await SessionCourseService.store({
                    session_id, department_id, course_id: newCourses
                });
                if(success) {
                    req.flash('message', message);
                }
            }
            return res.redirect("/admin/session-courses/add");
        }
        req.flash('message', error.message);
        return res.redirect("/admin/session-courses/add");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/session-courses/add");
    }
}

const getDepartmentCourses = async (req, res) => {
    const { sessionId, departmentId } = req.params;
    try{
        const departmentCourses = await DepartmentService.getDepartmentCourses(departmentId);
        const sessionCourses = await SessionCourseService.getSessionCourses(sessionId, departmentId);
        if(departmentCourses.success && sessionCourses.success) {
            const sessionCoursesId = sessionCourses.data.map(item => item.course_id)
            departmentCourses.data.forEach(item => {
                if(sessionCoursesId.includes(item.id)) {
                    item.checked = true
                }
            })
        }
        return res.send(departmentCourses)
    } catch (error) {
        return res.send({
            success: false,
            message: 'Failed to retrieve',
            data: null
        });
    }
};

module.exports = {
    index,
    create,
    store,
    getDepartmentCourses
}
