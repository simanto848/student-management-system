const DepartmentService = require("../../services/DepatmentService");
const FacultyService = require("../../services/FacultyService");
const setAlert = require("../../services/AlertService");

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
        return res.render("admin/departments/create", { faculties: success ? data: [], alertMessage: req.flash('message') });
    } catch (error) {
        return res.render("admin/departments/create", { faculties: []});
    }
}

const store = async (req, res) => {
    try {
        const payload = { short_name, faculty_id } = req.body;
        const { success, message, data } = await DepartmentService.store(payload);
        req.flash('message', message);
        if(!success){
            return res.redirect("/admin/departments/add");
        }
        return res.redirect("/admin/departments/add");
    } catch (error) {
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
    try {
        const { id } = req.params;
        const payload = { short_name, faculty_id } = req.body;
        const { success, message, data } = await DepartmentService.update(id, payload);
        req.flash('message', message);
        if(!success){
            return res.redirect("/admin/departments/edit/" + id);
        }
        return res.redirect("/admin/departments/edit/" + id);
    } catch (error) {
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

const getDepartmentCourses = async (req, res) => {
    const { id } = req.params;
    try{
        const response = await DepartmentService.getDepartmentCourses(id);
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
    getDepartmentCourses
};