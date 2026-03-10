const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// create document in Collection
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  lname: {
    type: String,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  dob: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profileImage: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);
