const logout = (req, res) => {
    try {
        req.session.destroy();
        return res.redirect("/");
    } catch (error) {
        return res.redirect("/");
    }
};

module.exports = logout;