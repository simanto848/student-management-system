const SessionService = require("../../services/SessionService")
const DepatmentService = require("../../services/DepatmentService");
const AdminStudentService = require("../../services/AdminStudentService");
const { adminStudentSchema } = require("../../helpers/validationSchema");

const index = async (req, res) => {
    try {
        const session = await SessionService.getAll();
        return res.render("admin/students/index", { sessions: session.data });
    } catch (error) {
        return res.render("admin/students/index");
    }
}

const create = async (req, res) => {
    try {
        const department = await DepatmentService.getAll();
        const session = await SessionService.getAll();
        return res.render("admin/students/create", { departments: department.data, sessions: session.data, alertMessage: req.flash('message') });
    } catch (error) {
        return res.render("admin/students/create", { departments: department.data, sessions: session.data, alertMessage: req.flash('message') });
    }
}

const store = async (req, res) => {
    try {
        const { error, value } = adminStudentSchema.validate(req.body, { abortEarly: true });
        if (!error){
            const payload = { name, registration_no, roll_no, phone_no, department_id, session_id, email, course_fee } = req.body
            const { success, message, data } = await AdminStudentService.store(payload);
            req.flash('message', message)
            return res.redirect("/admin/students/add");
        }
        req.flash('message', error.message);
        return res.redirect("/admin/students/add");
    } catch (error) {
        req.flash('message', error.message)
        return res.redirect("/admin/students/add");
    }
}

module.exports = {
    index,
    create,
    store
}