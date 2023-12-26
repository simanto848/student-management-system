
const index = (req, res) => {
    return res.render("index", { alertMessage: req.flash('message') });
}

module.exports = {
    index
}