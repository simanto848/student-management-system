const ensureAuthenticatedStudent = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/student");
};

const ensureAuthenticatedTeacher = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/teacher");
};

const ensureAuthenticatedAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/admin");
};

const forwardAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect("/admin/dashboard");
};

module.exports = {
    ensureAuthenticatedAdmin,
    ensureAuthenticatedStudent,
    ensureAuthenticatedTeacher,
    forwardAuthenticated
};