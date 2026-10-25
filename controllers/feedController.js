const Post = require("../models/Post");
const User = require("../models/User");

exports.getFeed = async (req, res) => {
  try {
    // 1. Current logged-in user ko find karein
    const user = await User.findOne({ username: req.user.username });

    

    // 2. Random posts fetch karne ke liye aggregate pipeline
    const posts = await Post.aggregate([
      { $sample: { size: 20 } },
      {
        $lookup: {
          from: "users",          // MongoDB collection name (usually lowercase plural)
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);

    // 3. Render feed view with all necessary data
    res.render("feed", { 
      user: user || req.user,   // Fallback taaki user kabhi undefined na ho
      posts, 
      hideNavbar: false 
    });

  } catch (err) {
    console.error("Error loading feed:", err);
    res.status(500).send("Internal Server Error");
  }
};
// $lookup → user join karega
// $unwind → array ko object banayega
