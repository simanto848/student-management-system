const db = require("../../config/dbConfig");
const Service = require("../services/Service")
const { setAlert } = require("../services/AlertService");

const create = (req, res) => {
    const payload = { code, title, semester, credit, department_id, session_id } = req.body;
    const { success, message, data } = Service.create("courses", payload);
    setAlert(req.session, success, message)
    return res.redirect("/admin/courses");
};

const update = (req, res) => {
    const { id } = req.params.id;
    const payload = { code, title, semester, credit, department_id, session_id } = req.body;
    const { success, message, data } = Service.update("courses", id, payload)
    setAlert(req.session, success, message)
    return res.redirect("/admin/courses");
};

const destroy = (req, res) => {
    const { id } = req.params;
    const { success, message, data } = Service.destroy("courses", id)
    setAlert(req.session, success, message)
    return res.redirect("/admin/courses");
};

module.exports = {
    create,
    update,
    destroy
};