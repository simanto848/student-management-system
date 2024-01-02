const TeacherService = require("../../services/TeacherService");

const index = (req, res) => {
    res.render("teacher/index", { title: "Teacher", alertMessage: req.flash('message') });
}

const dashboard = (req, res) => {
    res.render("teacher/dashboard", { title: "Teacher Dashboard" });
}

const getCourses = async (req, res) => {
    try {
        const teacher_id = req.session.user.id
        const response = await TeacherService.getCourses(teacher_id);
        return res.send(response)
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
    dashboard,
    getCourses
}