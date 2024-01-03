const EnrollmentService = require("../../services/EnrollmentService");
const { TRY_SEMESTER } = require("../../helpers/constant");

const index = (req, res) => {
    try {
        return res.render("admin/enrollments/index", { alertMessage: req.flash('message') });
    } catch (error) {
        return res.render("admin/enrollments/index");
    }
}

const create = async (req, res) => {
    try {
        const { studentId } = req.params;
        const result = await EnrollmentService.getByKeyword("student_id", studentId);
        const info = result.data[result.data.length - 1];
        return res.render("admin/enrollments/create", { feesInfo: info, semesters: TRY_SEMESTER, alertMessage: req.flash('message') });
    } catch (error) {
        return res.render("admin/enrollments/create", { alertMessage: req.flash('message') });
    }
}

const store = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { registration_no, semester, pay_amount } = req.body;
    } catch (error) {
        
    }
}

module.exports = {
    index,
    create,
    store
}