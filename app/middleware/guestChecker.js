const guestChecker = (req, res, next) =>{
    if(req.session.user){
        next()
    } else {
        return res.redirect("/user")
    }
}

module.exports = guestChecker;