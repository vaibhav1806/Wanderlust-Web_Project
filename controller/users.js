const User = require("../models/user.js");

module.exports.rendersignupForm = (req, res) => {

    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {

    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", "Welcome to Wonderlust !");
            res.redirect("/listings");
        });

    } catch (e) {

        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm =(req, res) => {

    res.render("users/login.ejs");

}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to Wonderlust !");
    let redirect = res.locals.redirectUrl || "/listings"
    res.redirect( redirect);
}

module.exports.logout = (req, res, next) => {

    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out now");
        res.redirect("/listings");
    });
}