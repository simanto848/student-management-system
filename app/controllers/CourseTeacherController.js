const Service = require("../services/Service");
const { setAlert } = require("../services/AlertService");

const create = (req, res) => {
    const payload = req.body;
    const result = Service.create(payload);

    if(result.success){
        setAlert(req.session, true, result.message);
        return res.redirect("/admin/course-teachers");
    }
    else {
        setAlert(req.session, false, result.message);
        return res.redirect("/admin/course-teachers");
    }
};

const update = (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    const result = Service.update(id, payload);
    if(result.success){
        setAlert(req.session, true, result.message);
        return res.redirect("/admin/course-teachers");
    }
    else {
        setAlert(req.session, false, result.message);
        return res.redirect("/admin/course-teachers");
    }
};

const destroy = (req, res) => {
    const id = req.params.id;
    const result = Service.deleteCourseTeacher(id);
    if(result.success){
        setAlert(req.session, true, result.message);
        return res.redirect("/admin/course-teachers");
    }
    else {
        setAlert(req.session, false, result.message);
        return res.redirect("/admin/course-teachers");
    }
};

module.exports = {
    create,
    update,
    destroy
};