const AppError = require("../AppError/AppError");
const blogs = require("../models/blogsM");
const category = require("../models/category");
const asyncHandler = require("../Middelware/asyncHandler");

//these two routes(getALLBlogs and post) are triggered in two cases 1> /blogs/
//2> /categories/categoryId/blogs/
//to handle the create and getAll function we will add some new feature to it in order to set the categoryId in req.body while creating blog and fetching the all blogs that belogs to perticular categoryId
exports.createBlog = asyncHandler(async (req, res, next) => {
  var result;
  result = await category.findById(req.params.categoryId);
  // console.log({categoryId:req.paras.categoryId})
  if (!result) {
    throw new AppError(404, "category not found from create blog");
  }

  req.body.categoryId = req.params.categoryId;

  result = await blogs.create(req.body);

  //here categoryId is already defined in blog schema so we are setting the categoryId value in the body from taking its value from the request body if and only if categoryId exists
  // req.body.categoryId = categoryT._id;
  res.status(201).json({
    success: true,
    message: "blog created",
    blogList: result,
  });
});

//these two routes(getALLBlogs and post) are triggered in two cases 1> /blogs/
//2> /categories/categoryId/blogs/
//to handle the create and getAll function we will add some new feature to it in order to set the categoryId in req.body while creating blog and fetching the all blogs that belogs to perticular categoryId
exports.getAllBlog = asyncHandler(async (req, res, next) => {
  var result;
  result = await category.findById(req.params.categoryId);
  if (result) {
    result = await blogs.find({ categoryId: req.params.categoryId });
  } else {
    result = await blogs.find();
  }
  res.status(200).json({
    blogCount: result.length,
    success: true,
    message: "blog retrived",
    blogList: result,
  });
});

exports.getSingleBlog = asyncHandler(async (req, res, next) => {
  let result;
  result = await blogs.findById(req.params.id);
  if (!result) {
    throw new AppError(404, "blog not found from get single id");
  }

  res.status(200).json({
    success: true,
    message: "single category is found using id method",
    blogList: result,
  });
});

exports.updateBlog = asyncHandler(async (req, res, next) => {
  let result;
  result = await blogs.findById(req.params.id);
  if (!result) {
    throw new AppError(404, "blog not found form update req");
  }

  result = await blogs.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    success: true,
    message: `blog is updated using update method with id ${req.params.id}`,
    blogList: result,
  });
});

exports.deleteBlog = asyncHandler(async (req, res, next) => {
  let result;
  result = await blogs.findById(req.params.id);
  if (!result) {
    throw new AppError(404, "blog not found from del req");
  }

  result = await blogs.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: `blog is deleted using delete method with id ${req.params.id}`,
    blogList: result,
  });
});
