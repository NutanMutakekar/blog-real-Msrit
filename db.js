const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/myapp");

  console.log("connected to mongodb database");
};
module.exports = connectDB;
