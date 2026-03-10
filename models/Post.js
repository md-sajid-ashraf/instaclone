const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  description: String,
  postImage: String,
});

module.exports = mongoose.model("post", postSchema);
