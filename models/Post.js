const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postImage: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  caption: String,
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
