const SessionService = require("../../services/SessionService");
const { SEMESTER } = require("../../helpers/constant");

const index = async (req, res) => {
    try {
        const { success, message, data } = await SessionService.getAll();
        return res.render("admin/sessions/index", { sessions: success ? data: []});
    } catch (error) {
        return res.render("admin/sessions/index")
    }
}

const create = (req, res) => {
    return res.render("admin/sessions/create", { semester: SEMESTER, alertMessage: req.flash('message') });
}

const store = async (req, res) => {
    try {
        const payload = { session, batch_no, semester } = req.body;
        const { success, message, data } = await SessionService.store(payload);
        req.flash('message', message);
        return res.redirect("/admin/sessions/add");
    } catch (error) {
        req.flash('message', "Something went wrong!")
        return res.redirect("/admin/sessions/add")
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message, data } = await SessionService.getByKeyWord('id', id);
        console.log(data);
        return res.render("admin/sessions/edit", { sessionResult: data[0] , semester: SEMESTER, alertMessage: req.flash('message')});
    } catch (error) {
        req.session('message', message);
        return res.render("admin/sessions/edit");
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = { session, batch_no, semester } = req.body;
        const { success, message, data } = await SessionService.update(id, payload);
        req.flash('message', message);
        return res.redirect("/admin/sessions/edit/" + id);
    } catch (error) {
        req.flash('message', message);
        return res.redirect("/admin/sessions/edit/" + id);
    }
}

const destroy = (req, res) => {
    try {
        const { id } = req.params;
        const { success, message, data } = SessionService.destroy(id);
        return res.redirect("/admin/sessions");
    } catch (error) {
        req.flash('message', message);
        return res.redirect("/admin/sessions");
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