const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        console.log("User found:", user); // check if user exists
        console.log("DB password:", user?.password);
        console.log("Input password:", password); // check what's coming in

        if (!user) {
          return done(null, false, { message: "Invalid username" });
        }

        if (user.password !== password) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (error) {
        // return done(error);
        console.log("Passport error:", error);
      }
    },
  ),
);
