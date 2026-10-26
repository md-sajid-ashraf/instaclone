const User = require("../models/User");

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
  console.log(req.file);
  user.profileImage = req.file.filename;
  await user.save();

  res.redirect("/profile");
};

exports.getAccountEdit = async (req, res) => {
  const user = await User.findOne({
    username: req.session.passport.user,
  }).populate("posts");

  res.render("accountEdit", { user, hideNavbar: false });
};

exports.updateProfile = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { username: req.session.passport.user },
    { username: req.body.username, bio: req.body.bio },
    { new: true },
  );

  if (req.file) {
    user.profileImage = req.file.filename;
  }

  await user.save();
  res.redirect("/profile");
};
