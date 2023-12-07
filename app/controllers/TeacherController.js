const TeacherService = require("../services/TeacherService");

const index = async (req, res) => {
    try {
        const { success, message, data } = await TeacherService.getAll();
        return res.render("admin/teachers/index", { teachers: success ? data: [], alertMessage: req.flash('message')});
    } catch (error) {
        return res.render("admin/teachers/index");
    }
}

const create = (req, res) => {
    const payload = req.body;
    // const result = Service.create("teachers", payload);
    res.render("admin/teachers/create",{alertMessage: req.flash('message')})
};

const edit = (req, res) => {
    res.render("");
}

const store = async (req, res) => {}

const update = (req, res) => {
    const id = req.params;
};

const destroy = (req, res) => {
    const id = req.params;
};

module.exports = {
    index,
    create,
    edit,
    update,
    destroy
};