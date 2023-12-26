const TeacherService = require("../../services/TeacherService");
const DepartmentService = require("../../services/DepatmentService");
const FacultyService = require("../../services/FacultyService");
const { TEACHER_ROLE } = require("../../helpers/constant");
const { teachersSchema } = require("../../helpers/validationSchema");

const index = async (req, res) => {
    try {
        const { success, message, data } = await TeacherService.getAll();
        return res.render("admin/teachers/index", { teachers: success ? data: [], alertMessage: req.flash('message')});
    } catch (error) {
        return res.render("admin/teachers/index");
    }
}

const create = async (req, res) => {
    const { success, data } = await FacultyService.getAll();
    const departments =  await DepartmentService.getAll();
    res.render("admin/teachers/create",{faculties: success ? data: [], departments: departments.data, teacher_rolls: TEACHER_ROLE, alertMessage: req.flash('message')})
};

const store = async (req, res) => {
    try {
        const { error, value } = teachersSchema.validate(req.body, { abortEarly: true });
        if (!error){
            const payload = { name, email, faculty_id, department_id, role } = req.body;
            console.log(departmentTeachers);
            const { success, message, data } = await TeacherService.store(payload);
            req.flash('message', message);
            return res.redirect("/admin/teachers/add");
        }
        req.flash('message', error.message);
        return res.redirect("/admin/teachers/add");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/teachers/add");
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message, data } = await TeacherService.getByKeyword('id', id);
        const faculties = await FacultyService.getAll();
        const departments =  await DepartmentService.getAll();
        return res.render("admin/teachers/edit", { teachers: success ? data: [], faculties: faculties.data, departments: departments.data, teacher_rolls: TEACHER_ROLE,alertMessage: req.flash('message')});
    } catch (error) {
        return res.render("admin/teachers/index");
    }
}
const update = async (req, res) => {
    const { id } = req.params;
    try {
        const { error, value } = await teachersSchema.validate(req.body, { abortEarly: true });
        if (!error) {
            const payload = { name, email, password, faculty_id, department_id, role } = req.body;
            const { success, message, data } = await TeacherService.update(id, payload);
            req.flash('message', message);
            return res.redirect("/admin/teachers/edit/" + id);
        }
        req.flash('message', error.message);
        return res.redirect("/admin/teachers/edit/" + id);
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/teachers/edit/" + id);
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const { success, message, data } = await TeacherService.destroy(id);
        req.flash('message', message);
        return res.redirect("/admin/teachers");
    } catch (error) {
        req.flash('message', error.message);
        return res.redirect("/admin/teachers");
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