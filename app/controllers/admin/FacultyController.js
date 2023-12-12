const FacultyService = require("../../services/FacultyService");
const { facultySchema } = require("../../helpers/validationSchema");

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
        const { error, value } = await facultySchema.validateAsync(req.body, { abortEarly: false});
        if(!error){
            const { short_name } = req.body;
            const { success, message, data } = await FacultyService.store({short_name});
            req.flash('message', message);
            return res.redirect("/admin/faculties/add");
        }
        req.flash('message', error.message);
        return res.redirect("/admin/faculties/add");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/faculties/add");
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { success, message, data } = await FacultyService.getByKeyword('id', id);
    res.render("admin/faculties/edit", { faculty: success ? data[0] : [], alertMessage: req.flash('message') });
};

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const { error, value } = await facultySchema.validateAsync(req.body, { abortEarly: false});
        const {short_name} = req.body;
        if (!error){
            const { success, message, data } = await FacultyService.update(id, short_name);
            req.flash('message', message);
            return res.redirect("/admin/faculties/edit/" + id );
        }
        req.flash('message', error.message);
        return res.redirect("/admin/faculties/edit/" + id );
    } catch (error) {
        req.flash('message', error.message);
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

const getDepartments = async (req, res) => {
    const { id } = req.params;
    try{
        const response = await FacultyService.getDepartments(id);
        return res.send(response);
    } catch (error) {
        return res.send({
            success: false,
            message: 'Failed to retrieve',
            data: null
        });
    }
};


module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy,
    getDepartments
};