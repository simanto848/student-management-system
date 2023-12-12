const AdminService = require("../../services/AdminService");
const { authSchema } = require("../../helpers/validationSchema");

const index = (req, res) => {
    const message = req.flash("message");
    res.render("admin/admin/index", { alertMessage: req.flash('message') });
};

const login = async (req, res) => {
    try{
        const { error, value } = await authSchema.validateAsync(req.body, { abortEarly: true });
        if (!error) {
            const payload = { email, password } = req.body;
            const { success, message, data } = await AdminService.login(payload);
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

const dashboard = (req, res) => {
    res.render("admin/admin/dashboard");
};

module.exports = {
    index,
    login,
    dashboard,
};