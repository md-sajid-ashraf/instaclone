var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressSession = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const connectDB = require("./config/db");

// Connect Database
connectDB();

// models load 
require("./models/User");
require("./models/Post");

var User = require("./models/User");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/userRoutes")
var postRouter = require("./routes/postRoutes")


var app = express();

// View engine 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout"); // layout.ejs use karega


// ✅ STEP 1 - Pehle Basic Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ✅ STEP 2 - Phir Session
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "hey hello hey",
}));
app.use(flash());

// ✅ STEP 3 - Phir Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ STEP 4 - Sabse Last mein Routes
app.use("/", indexRouter);
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/feedRoutes"));
app.use("/", require("./routes/postRoutes"));


// ## Rule Yaad Rakho

// 1. Basic Middleware     (json, urlencoded, cookieParser)
// 2. Session & Flash      (expressSession, flash)
// 3. Passport             (initialize, session)
// 4. Routes               (app.use("/", ...))
// Yeh order hamesha follow karo! 🚀




app.use((req,res,next)=>{
  res.locals.hideNavbar = true
  next()
})



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
console.log(__dirname);
module.exports = app;
