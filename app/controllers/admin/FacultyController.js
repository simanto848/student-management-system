const FacultyService = require("../../services/FacultyService");
const swal = require('sweetalert');

const index = async (req, res) => {
    try{
        const { success, message, data } = await FacultyService.getAll();
        return res.render("admin/faculties/index", { faculties: success ? data : [], alertMessage: req.flash('message')});
    } catch (error) {
        return res.render("admin/faculties/index", { faculties: [] });
    }
};

const create = (req, res) => {
    return res.render("admin/faculties/create", { alertMessage: req.flash('message') });
};

const store = async (req, res) => {
    try {
        const { short_name } = req.body;
        const { success, message, data } = await FacultyService.store({short_name});
        req.flash('message', message);
        return res.redirect("/admin/faculties/add");
    } catch (error) {
        return res.redirect("/admin/faculties/add");
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { success, message, data } = await FacultyService.getByKeyword('id', id);
    res.render("admin/faculties/edit", { faculty: success ? data: [], alertMessage: req.flash('message') });
};

const update = async (req, res) => {
    const { id } = req.params;
    const {short_name} = req.body;
    try {
        const { success, message, data } = await FacultyService.update(id, short_name);
        req.flash('message', message);
        return res.redirect("/admin/faculties/edit/" + id );
    } catch (error) {
        return res.redirect("/admin/faculties/edit/" + id );
    }
}

const destroy = async (req, res) => {
    const { id } = req.params;
    try{
        const { success, message, data } = await FacultyService.destroy(id);
        return res.redirect("/admin/faculties");
    } catch (error) {
        return res.redirect("/admin/faculties");
    }
};


module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
};