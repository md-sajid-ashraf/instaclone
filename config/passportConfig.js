
passport.use(
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await user.findOne({ username });

        if (!user) {
          return done(null, false, { message: "Invalid username" });
        }

        if (user.password !== password) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);