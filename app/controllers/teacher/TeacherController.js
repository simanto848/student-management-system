const index = (req, res) => {
    res.render("teacher/index", { title: "Teacher", alertMessage: req.flash('message') });
}

const dashboard = (req, res) => {
    res.render("teacher/dashboard", { title: "Teacher Dashboard" });
}

module.exports = {
    index,
    dashboard,
}