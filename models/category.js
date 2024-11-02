const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique:true,
      minLength: [3, "name cannot be less than 3 characters"],
      maxLength: [44, "name cannot be more than 44 characters"],
    },
    description: {
      type: String,
      minLength: [100, "description cannot be less than 100 characters"],
      maxLength: [1000, "description cannot be more than thousand characters"]
    },
  },
  {
    timestamps: true,
  }
);

const category = mongoose.model("category", categorySchema);
module.exports = category;
