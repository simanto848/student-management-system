const { authSchema } = require("../helpers/validationSchema");
const AdminService = require("../services/AdminService");
const TeacherService = require("../services/TeacherService");
const StudentService = require("../services/StudentService");


const AdminLogin = async (req, res) => {
    try{
        const { error, value } = await authSchema.validateAsync(req.body, { abortEarly: true });
        if (!error) {
            const payload = { email, password } = req.body;
            const { success, message, data } = await AdminService.login(payload);
            req.session.user = data;
            req.flash('message', message);
            return res.redirect("/admin/dashboard");
        }
        req.flash('message', error.message);
        return res.redirect("/admin");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin");
    }
}

const TeacherLogin = async (req, res) => {
    try{
        const { error, value } = await authSchema.validateAsync(req.body, { abortEarly: true });
        if (!error) {
            const payload = { email, password } = req.body;
            const { success, message, data } = await TeacherService.login(payload);
            req.session.user = data;
            return res.redirect("/teacher/dashboard");
        }
        req.flash('message', error.message);
        return res.redirect("/teacher");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/teacher");
    }
}

const StudentLogin = async (req, res) => {
    try{
        const { error, value } = await authSchema.validateAsync(req.body, { abortEarly: true });
        if (!error) {
            const payload = { email, password } = req.body;
            const { success, message, data } = await StudentService.login(payload);
            req.session.user = data;
            return res.redirect("/admin/dashboard");
        }
        req.flash('message', error.message);
        return res.redirect("/");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/");
    }
}

module.exports = {
    AdminLogin,
    TeacherLogin,
    StudentLogin
}