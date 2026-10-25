const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/insta-user');
    console.log(`MongoDB Connected ${process.env.MONGO_URI ? "MongoDB Atlas" : "MongoDB Local"}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}; 

module.exports = connectDB;