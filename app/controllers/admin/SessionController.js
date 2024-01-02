const SessionService = require("../../services/SessionService");
const { sessionSchema } = require("../../helpers/validationSchema");
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
        const { error, value } = await sessionSchema.validateAsync(req.body, { abortEarly: true });
        if (!error){
            const payload = { session, batch_no, semester } = req.body;
            const { success, message, data } = await SessionService.store(payload);
            req.flash('message', message);
            return res.redirect("/admin/sessions/add");
        }
        req.flash('message', error.message)
        return res.redirect("/admin/sessions/add")
    } catch (error) {
        req.flash('message', error.message)
        return res.redirect("/admin/sessions/add")
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message, data } = await SessionService.getByKeyWord('id', id);
        return res.render("admin/sessions/edit", { sessionData: data[0], semester: SEMESTER, alertMessage: req.flash('message') });
    } catch (error) {
        console.log("Custom: ", error);
        return res.render("admin/sessions/edit");
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const { error, value } = await sessionSchema.validateAsync(req.body, { abortEarly: true });
        const payload = { session, batch_no, semester } = req.body;
        if (!error) {
            const { success, message, data } = await SessionService.update(id, payload);
            req.flash('message', message);
            return res.redirect("/admin/sessions/edit/" + id);
        }
        req.flash('message', error.message);
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

const getCourses = async (req, res) => {
    const { id } = req.params;
    try{
        const response = await SessionService.getCourses(id);
        return res.send(response);
    } catch (error) {
        return res.send({
            success: false,
            message: 'Failed to retrieve',
            data: null
        });
    }
};

getStudents = async (req, res) => {
    const { sessionId } = req.params
    try {
        const response = await SessionService.getStudents(sessionId);
        return res.send(response);
    } catch (error) {
        return res.send({
            success: false,
            message: 'Failed to retrieve',
            data: null
        })
    }
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy,
    getCourses,
    getStudents
}