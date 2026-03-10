const User = require("../models/User");
const passport = require("passport");
const ensureAuthenticated = require("../middleware/authMiddleware");
const feedController = require("../controllers/feedController");

// GET REQUEST - SIGNUP
exports.getSignup = (req, res) => {
  res.render("signup", {hideNavbar: true});
};

exports.signupUser = async (req, res) => {
  const {fname, lname, username, email, dob, phone, password} = req.body;

  const userdata = new User({
    fname,
    lname,
    username,
    email,
    dob,
    phone,
  });

  User.register(userdata, password, (err, user) => {
    if (err) {
      console.log("Register Error ❌", err);

      // API request
      if (req.xhr || req.headers["accept"] === "*/*") {
        return res.status(400).json({message: err.message});
      }

      // Browser request
      req.flash("error", err.message);
      return res.redirect("/signup");
    }

    console.log("User Registered ✅", user);

    // API request (Thunder Client)
    if (req.xhr || req.headers["accept"] === "*/*") {
      return res.status(201).json({
        message: "Registration successful",
        user: {
          id: user._id,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
          email: user.email,
          dob: user.dob,
        },
      });
    }
    //  Browser request → redirect to login
    res.redirect("/");
  });
};

// GET REQUEST - LOGIN
exports.getLogin = (req, res) => {
  const error = req.flash("error");
  res.render("login", {hideNavbar: true, message: error});
  // res.render("login", {hideNavbar: true});
};

/* LOGIN */
exports.loginUser = async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      return res.status(401).json({message: info.message});
    }
    req.logIn(user, (err) => {
      if (err) return next(err);

      // API request -> (Postman/ Thunder client)
      if (req.headers["accept"] === "*/*") {
        return res.status(200).json({
          message: "Login successful",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      }
      // Browser request -> redirect
      return res.redirect("/feed");
    });
  })(req, res);
};

/* LOGOUT */
exports.logoutUser = async (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
};
