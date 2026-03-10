// var express = require("express");
// var router = express.Router();
// const passport = require("passport");
// const ensureAuthenticated = require("../middleware/authMiddleware");
// var User = require("../models/User");
// const feedController = require("../controllers/feedController");

/* GET Login Page */
// router.get("/", function (req, res) {
//   const error = req.flash("error");
//   res.render("login", {hideNavbar: true, message: error});
// });

// /* LOGIN */
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (!user) {
//       return res.status(401).json({message: info.message});
//     }
//     req.logIn(user, (err) => {
//       if (err) return next(err);

//       // API request -> (Postman/ Thunder client)
//       if (req.headers["accept"] === "*/*") {
//         return res.status(200).json({
//           message: "Login successful",
//           user: {
//             id: user._id,
//             username: user.username,
//             email: user.email,
//           },
//         });
//       }
//       // Browser request -> redirect 
//       return res.redirect("/feed"); 
//     });
//   })(req, res, next);
// });

// /* LOGOUT */
// router.get("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// });

/* HOME PAGE (After Login) */
// router.get("/feed", ensureAuthenticated, feedController.getFeed);
// router.get("/feed", ensureAuthenticated, async function (req, res) {
//   const user = await User.findByUsername(req.user.username).populate("posts");

//   res.render("feed", {user});
// });

// module.exports = router;

// var express = require("express");
// var router = express.Router();
// var User = require("./users");
// var Post = require("./post");
// const passport = require("passport");
// const localStrategy = require("passport-local");
// const upload = require("./multer");
// const {open} = require("node:fs/promises");
// const fs = require("fs");
// const path = require("path");

// passport.use(
//   new localStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//     },
//     async (username, password, done) => {
//       try {
//         const user = await User.findOne({username});
//         if (!user) {
//           return done(null, false, {message: "Invalid username or password"});
//         }

//         if (user.password !== password) {
//           return done(null, false, {message: "Invalid password"});
//         }

//         return done(null, user, true, {messsage: "Success"});
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// /*    ------------------------------   SIGNUP ROUTES  ---------------------------   */

// /* GET SignUp page. */
// router.get("/signup", function (req, res) {
//   res.render("signup", {navbar: false, message: false});
// });

// /* Create user and registered in database . */
// router.post("/signup", function (req, res) {
//   const {fname, lname, username, email, dob, phone, password} = req.body;
//   const userdata = new User({
//     fname,
//     lname,
//     username,
//     email,
//     dob,
//     phone,
//     password,
//   });
//   User.register(userdata, req.body.password)
//     .then(function (registereduser) {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/home");
//       });
//     })
//     .catch(function (err) {
//       console.log("Error signup user:", err);
//       res.status(500).send("Already registered");
//     });
// });

// /*    ------------------------------   LOGIN ROUTES  ---------------------------   */

// router.get("/", function (req, res, next) {
//   const error = req.flash("error");
//   res.render("index", {navbar: false, message: error});
// });

// /* User login Authenticated */
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/home",
//     failureRedirect: "/",
//     failureFlash: true,
//   }),
//   function (req, res) {}
// );

// /* Protected home route - Only authenticated user can access */
// router.get("/home", ensureAuthenticated, async function (req, res) {
//   const username = req.session.passport.user;
//   const user = await User.findOne({username: username}).populate("posts");
//   res.render("home", {user, navbar: true});
// });

// /*    ------------------------------  User POST ROUTES  ---------------------------   */

// // GET Post page - Only authenticated user can access */
// router.get("/addpost", ensureAuthenticated, async function (req, res) {
//   const user = await User.findOne({
//     username: req.session.passport.user,
//   }).populate("posts");

//   res.render("post", {user, navbar: true, message: false});
// });

// /* Create Post */
// router.post(
//   "/addpost",
//   ensureAuthenticated,
//   upload.single("postImage"),
//   async function (req, res, next) {
//     const user = await User.findOne({username: req.session.passport.user});
//     const post = await Post.create({
//       user: user._id,
//       description: req.body.description,
//       postImage: req.file.filename,
//     });
//     if (post) {
//       user.posts.unshift(post._id);
//       await user.save();
//       res.redirect("/");
//     } else {
//       res.send("Error 404");
//     }
//   }
// );

// // GET Profile page - Only authenticated user can access */
// router.get("/profile", ensureAuthenticated, async function (req, res, next) {
//   const user = await User.findOne({
//     username: req.session.passport.user,
//   }).populate("posts");

//   res.render("profile", {user, navbar: true});
// });

// // PROFILE UPLOAD
// router.post(
//   "/fileupload",
//   ensureAuthenticated,
//   upload.single("image"),
//   async function (req, res, next) {
//     const user = await User.findOne({username: req.session.passport.user});
//     user.profileImage = req.file.filename;
//     await user.save();
//     res.redirect("/profile");
//   }
// );

// /*    ------------------------------   RESET PASSWORD ROUTES  ---------------------------   */

// // Get reset password page
// router.get("/accounts/password/reset", async function (req, res, next) {
//   res.render("forgetPass", {navbar: false, message: false});
// });

// router.post("/accounts/password/reset", async function (req, res, next) {
//   const {username} = req.body;
//   req.session.username = username;
//   const user = await User.findOne({username: req.session.username});
//   if (user) {
//     generateOTP();
//     res.redirect(`/accounts/auth/${user.id}`);
//   } else {
//     res.send("Error: user not found ");
//   }
// });

// // Get OTP authenticate page
// router.get("/accounts/auth/:id", async function (req, res, next) {
//   const userId = req.params.id;
//   const user = await User.findById(userId);
//   res.render("otpPage", {user, navbar: false, message: false});
// });

// router.post("/accounts/auth/:id", async function (req, res, next) {
//   const userId = req.params.id;
//   const userfilledOtp = req.body.otpCode;
//   const otpfile = await readOTPfile();
//   if (userfilledOtp === otpfile) {
//     res.redirect(`/accounts/${userId}`);
//   } else {
//     res.redirect(`/accounts/auth/${userId}`);
//   }
// });

// // Get New Password create Page.
// router.get("/accounts/:id", async function (req, res, next) {
//   const userId = req.params.id;
//   const user = await User.findById(userId);
//   res.render("createPass", { user, navbar: false, message: false});
// });

// router.post("/accounts/:id", async function (req, res, next) {
//   const userId = req.params.id;
//   const {username} = req.body;
//   req.session.username = username;
//   await User.findOne({username: username}).then((user)=>{
//     console.log(user);

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     user.password = req.body.newpassword;
//     user.save();

//     res.redirect("/");
//   }).catch( (error) =>{
//     console.log(error);
//     // req.flash("error", error);
//     // res.redirect("/accounts/password/reset");
//   })

// });

// /* logout route */
// router.get("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// });

// /*    ------------------------------   Calling Funtion ---------------------------   */

// /* Check user is loggedIn or not */
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/");
// }

// // Generate 6-digit OTP and create OTP file
// function generateOTP() {
//   const length = 6;
//   let OTP = "";
//   for (let i = 0; i < length; i++) {
//     OTP += Math.floor(Math.random() * 10);
//   }
//   const filename = "otp.txt";
//   const filePath = path.join("./", filename);
//   fs.writeFile(filePath, OTP, (err) => {
//     if (err) {
//       return err;
//     }
//     console.log("File write successfully... ");
//   });
//   return OTP;
// }

// // Read OTP file
// async function readOTPfile() {
//   const file = await open("./otp.txt");

//   for await (const code of file.readLines()) {
//     return code;
//   }
//   file.close();
// }

// module.exports = router;

/* {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({username});
          if (!user) {
            return done(null, false, {message: "Invalid username or password"});
          }

          if (user.password !== password) {
            return done(null, false, {message: "Invalid password"});
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
*/
