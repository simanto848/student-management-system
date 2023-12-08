const CourseService = require("../../services/CourseService");
const DepartmentService = require("../../services/DepatmentService");
const { MAINTAINABLE } = require("../../helpers/constant");

const index = async (req, res) => {
    try {
        const { success, message, data } = await CourseService.getAllByJoin();
        return res.render("admin/courses/index", { courseInfo: success ? data: [], alertMessage: req.flash('message')});
    } catch (error) {
        
    }
}

const create = async (req, res) => {
    try {
        const { success, message, data } = await DepartmentService.getAll();
        return res.render("admin/courses/create", { departments: success ? data: [], MAINTAINABLE ,alertMessage: req.flash('message')});
    } catch (error) {
        return res.render("admin/courses/create")
    }
}

const store = async (req, res) => {
    try {
        const payload = { code, title, semester, department_id, maintainable} = req.body;
        const { success, message, data } = await CourseService.store(payload);
        req.flash('message', message);
        return res.redirect("/admin/courses/add");
    } catch (error) {
        req.flash('message', message);
        return res.redirect("/admin/courses/add");
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message, data } = await CourseService.getByKeyword('id', id);
        const departments = await DepartmentService.getAll();
        return res.render("admin/courses/edit", { course: data[0], departments: departments.data, MAINTAINABLE ,alertMessage: req.flash('message')});
    } catch (error) {
        return res.render("admin/courses/edit")
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = { code, title, semester, department_id, maintainable} = req.body;
        const { success, message, data } = await CourseService.update(id, payload);
        req.flash('message', message);
        return res.redirect("/admin/courses/edit/" + id);
    } catch (error) {
        req.flash('message', message);
        return res.redirect("/admin/courses/edit/" + id);
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const {success, message, data } = await CourseService.destroy(id);
        return res.redirect("/admin/courses");
    } catch (error) {
        return res.redirect("/admin/courses");
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