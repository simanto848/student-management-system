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
        const { error, value } = await  sessionCourseSchema.validateAsync(req.body, { abortEarly: true });
        if (!error) {
            const payload = { session_id, course_id } = req.body;
            const { success, message, data } = await SessionCourseService.store(payload);
            req.flash('message', message);
            return res.redirect("/admin/session-courses/add");
        }
        req.flash('message', error.message);
        return res.redirect("/admin/session-courses/add");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/session-courses/add");
    }
}

const edit = async (req, res) => {}

const update = async (req, res) => {}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message } = await SessionCourseService.destroy(id);
        req.flash('message', message);
        return res.redirect("/admin/session-courses");
    } catch (error) {
        return res.redirect("/admin/session-courses");
    }
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
}
