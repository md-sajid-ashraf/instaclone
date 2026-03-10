const User = require("../models/User")

exports.getProfile = async (req, res) => {
  const user = await User.findOne({
    username: req.session.passport.user,
  }).populate("posts");

  res.render("profile", { user, hideNavbar: false });
};

exports.getNewpost = async (req, res) => {
  const user = await User.findOne({
    username: req.session.passport.user,
  }).populate("posts");

  res.render("post", { user, hideNavbar: false });
};

exports.uploadProfile = async (req, res) => {
  const user = await User.findOne({
    username: req.session.passport.user,
  });

  user.profileImage = req.file.filename;
  await user.save();

  res.redirect("/profile");
};