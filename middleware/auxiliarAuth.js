function auth(req, res, next) {
    if (req.session.auxiliares) {
        next();
    } else {
        res.redirect("/auxiliares/login");
    }
}
module.exports = auth;