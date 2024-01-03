const SessionService = require("../../services/SessionService")
const DepatmentService = require("../../services/DepatmentService");
const StudentService = require("../../services/StudentService");
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
            const { success, message, data } = await StudentService.store(payload);
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

const edit = async (req, res) => {
    try {
        const { id } = req.params
        const students = await StudentService.getByKeyword('id', id);
        const department = await DepatmentService.getAll();
        const session = await SessionService.getAll();
        return res.render("admin/students/edit", { student: students.data[0], departments: department.data, sessions: session.data, alertMessage: req.flash('message') })
    } catch (error) {
        
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const { error, value } = adminStudentSchema.validate(req.body, { abortEarly: true });
        if(!error) {
            const payload = { name, registration_no, roll_no, phone_no, department_id, session_id, email, course_fee } = req.body;
            const { success, message } = await StudentService.update(id, payload);
            req.flash('message', message);
            return res.redirect("/admin/students/edit/" + id);
        }
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/students/edit/" + id);
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message } = await StudentService.destroy(id);
        return res.redirect("/admin/students");
    } catch (error) {
        return res.redirect("/admin/students")
    }
}

const getStudentInfo = async (req, res) => {
    try {
        const { regNo } = req.params
        const response = await StudentService.getStudentInfo(regNo);
        return res.send(response);
    } catch (error) {
        return res.send({
            success: false,
            message: 'No Record Found!',
            data: null
        });
    }
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy,
    getStudentInfo
}