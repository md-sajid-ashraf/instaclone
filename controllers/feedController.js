const Post = require("../models/Post");
const User = require("../models/User");

exports.getFeed = async (req, res) => {
  const user = await User.findByUsername(req.user.username).populate("posts");
  const posts = await Post.aggregate([
    {$sample: {size: 20}},
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {$unwind: "$user"},
  ]);

  res.render("feed", {user, posts, hideNavbar: false});
};

// $lookup → user join karega
// $unwind → array ko object banayega
