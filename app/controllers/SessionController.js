const Service = require("../services/Service");
const setAlert = require("../services/AlertService");

const create = (req, res) => {
    const payload = req.body;
    const result = Service.create("sessions", payload);
    if(result.success){
        setAlert(req.session, true, result.message);
        return res.redirect("/admin/sessions");
    }
    else{
        setAlert(req.session, false, result.message);
        return res.redirect("/admin/sessions");
    }
};

const update = (req, res) => {
    const id = req.params;
    const session = req.body;
    const result = Service.update("sessions", id, session);
    if(result.success){
        setAlert(req.session, true, result.message);
        return res.redirect("/admin/sessions");
    }
    else{
        setAlert(req.session, false, result.message);
        return res.redirect("/admin/sessions");
    }
};

const destroy = (req, res) => {
    const id = req.params.id;
    const result = Service.destroy("sessions", id);
    if(result.success){
        setAlert(req.session, true, result.message);
        return res.redirect("/admin/sessions");
    }
    else{
        setAlert(req.session, false, result.message);
        return res.redirect("/admin/sessions");
    }
};

module.exports = {
    create,
    update,
    destroy
};