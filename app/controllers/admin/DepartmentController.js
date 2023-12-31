const DepartmentService = require("../../services/DepatmentService");
const FacultyService = require("../../services/FacultyService");
const setAlert = require("../../services/AlertService");
const { departmentSchema } = require("../../helpers/validationSchema")

const index = async (req, res) => {
    try {
        const { success, message, data } = await DepartmentService.getAll();
        return res.render("admin/departments/index", { faculties: success ? data : [], alertMessage: req.flash('message') });
    } catch(error) {
        return res.render("admin/departments/index", { faculties: [] });
    }
}

const create = async (req, res) => {
    try {
        const { success, message, data } = await FacultyService.getAll();
        return res.render("admin/departments/create", { faculties: success ? data : [], alertMessage: req.flash('message') });
    } catch (error) {
        return res.render("admin/departments/create", { faculties: []});
    }
}

const store = async (req, res) => {
    try {
        const { error, value } = await departmentSchema.validateAsync(req.body, { abortEarly: false });
        if (!error){
            const payload = { short_name, faculty_id } = req.body;
            const { success, message, data } = await DepartmentService.store(payload);
            req.flash('message', message);
            return res.redirect("/admin/departments/add");
        }
        else {
            return res.redirect("/admin/departments/add");
        }
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/departments/add");
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message, data } = await FacultyService.getAll();
        const name = await DepartmentService.getByKeyword("id", id);
        return res.render("admin/departments/edit", {faculties: success ? data: [], department: name.data[0], alertMessage: req.flash('message')})
    } catch (error){
        return res.redirect("/admin/departments");
    }
};


const update = async (req, res) => {
    const { id } = req.params;
    try {
        const { error, value } = await departmentSchema.validateAsync(req.body, { abortEarly: false });
        if (!error){
            const payload = { short_name, faculty_id } = req.body;
            const { success, message, data } = await DepartmentService.update(id, payload);
            req.flash('message', message);
            if(!success){
                return res.redirect("/admin/departments/edit/" + id);
            }
            return res.redirect("/admin/departments/edit/" + id);
        }
        req.flash('message', "Update failed");
        return res.redirect("/admin/departments/edit/" + id);
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/departments/edit/" + id);
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message, data } = await DepartmentService.destroy(id);
        if(!success){
            return res.redirect("/admin/departments");
        }
        return res.redirect("/admin/departments")
    } catch (error) {
        return res.redirect("/admin/departments");
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