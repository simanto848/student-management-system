const {authSchema} = require("../helpers/validationSchema");
const AdminService = require("../services/AdminService");
const TeacherService = require("../services/TeacherService");


const AdminLogin = async (req, res) => {
    try{
        const { error, value } = await authSchema.validateAsync(req.body, { abortEarly: true });
        if (!error) {
            const payload = { email, password } = req.body;
            const { success, message, data } = await AdminService.login(payload);
            req.session.admin = data;
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
            req.session.teacher = data;
            return res.redirect("/teacher/dashboard");
        }
        req.flash('message', error.message);
        return res.redirect("/teacher");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/teacher");
    }
}

module.exports = {
    AdminLogin,
    TeacherLogin,
}