const AdminService = require("../services/AdminService");

const index = (req, res) => {
    const message = req.flash("message");
    res.render("admin/admin/index", { alertMessage: req.flash('message') });
};

const login = async (req, res) => {
    try{
        const payload = { email, password } = req.body;
        const { success, message, data } = await AdminService.login(payload);
        req.flash('message', message);
        return res.redirect("/admin/dashboard");
    } catch (error) {
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