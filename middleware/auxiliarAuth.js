function auth(req, res, next) {
    console.log(req.session); 
    if (req.session.auxiliar) {
        next();
    } else {
        res.redirect("/auxiliares/login");
    }
}
module.exports = auth;