const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minLength: [
        1,
        `name cannot be less than 1 character given value is {VALUE}`,
      ],
      maxLength: [
        21,
        `name cannot be more than 21 character given value is {VALUE}`,
      ],
    },
    body: {
      type: String,
      required: true,
      minLength: [
        100,
        `description cannot be less than 3 character given value is {VALUE}`,
      ],
    },
    likes: {
      type: Number,
      default: 0,
      required: [true, "likes cannot be empty"],
    },
    status: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },

    categoryId:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,"please provide the categoryId"]

    }
  },
  {
    timestamps: true,
  }
);

const blogs = mongoose.model("blogs", blogSchema);
module.exports = blogs;
