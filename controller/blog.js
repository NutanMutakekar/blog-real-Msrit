const AppError = require("../AppError/AppError");
const blogs = require("../models/blogsM");
const category = require("../models/category");

//these two routes(getALLBlogs and post) are triggered in two cases 1> /blogs/
//2> /categories/categoryId/blogs/
//to handle the create and getAll function we will add some new feature to it in order to set the categoryId in req.body while creating blog and fetching the all blogs that belogs to perticular categoryId
exports.createBlog = async (req, res,next) => {
  try {
    var result;
    result = await category.findById(req.params.categoryId);
    // console.log({categoryId:req.paras.categoryId})
    if (!result) {
      // return res.status(404).json({
      //   success: false,
      //   message: "category not found"
      // });
      throw new AppError(404,"category not found from createBlog req")
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
  } catch (error) {
    // res.status(404).json({
    //   success: false,
    //   message: "something went wrong",
    //   error,
    // });
    next(error)
  }
};

//these two routes(getALLBlogs and post) are triggered in two cases 1> /blogs/
//2> /categories/categoryId/blogs/
//to handle the create and getAll function we will add some new feature to it in order to set the categoryId in req.body while creating blog and fetching the all blogs that belogs to perticular categoryId
exports.getAllBlog = async (req, res) => {
  try {
    var result;
 result= await category.findById(req.params.categoryId);
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
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    let result;
    result = await blogs.findById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `blog with the id ${req.params.id} is not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "single category is found using id method",
      blogList: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let result;
    result = await blogs.findById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `blog with the id ${req.params.id} does not exist`,
      });
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
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let result;
    result = await blogs.findById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `blog with the id ${req.params.id} does not exist`,
      });
    }

    result = await blogs.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: `blog is deleted using delete method with id ${req.params.id}`,
      blogList: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};
