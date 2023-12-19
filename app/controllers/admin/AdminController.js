const AdminService = require("../../services/AdminService");
const { authSchema } = require("../../helpers/validationSchema");

const index = (req, res) => {
    res.render("admin/admin/index", { alertMessage: req.flash('message') });
};

const dashboard = (req, res) => {
    res.render("admin/admin/dashboard");
};

module.exports = {
    index,
    dashboard,
};