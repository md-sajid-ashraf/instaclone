const User = require("../models/User");
const Post = require("../models/Post");

exports.getAddPost = async (req, res) => {
  const user = await User.findOne({
    username: req.session.passport.user,
  }).populate("posts");

  res.render("profile", {user, hideNavbar: false});
};

exports.createPost = async (req, res) => {
  const user = await User.findOne({
    username: req.session.passport.user,
  });

  const post = await Post.create({
    postImage: req.file ? req.file.filename : null,
    user: user._id,
    caption: req.body.caption,
  });

  if (post) {
    user.posts.unshift(post._id);
    await user.save();
    res.redirect("/feed");
  } else {
    res.send("ERROR: 500");
  }

  // console.log(req.file);
  // console.log(req.body);
};
