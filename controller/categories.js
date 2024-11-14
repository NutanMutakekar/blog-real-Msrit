const category = require("../models/category");
const AppError=require("../AppError/AppError")
const blogs=require("../models/blogsM")
exports.createCategory = async (req, res,next) => {
  try {
    const cat = await category.create(req.body);
    res.status(201).json({
      successs: true,
      category: cat
    });
  } catch(error){
    res.status(404).json({
      status: false,
      message: "something went wrong",
      error
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const cat = await category.find();
    res.status(200).json({
      success: true,
      count: cat.length,
      categories: cat
    });
  } catch (error) {
    // res.status(404).json({
    //   success: false,
    //   message: "something went wrong",
    //   error
    // });
    next (error);
  }
};

exports.getCategoryById = async (req, res,next) => {
  try {
    let cat;
    cat = await category.findById(req.params.id);
    if (!cat) {
      // res.status(404).json({
      //   success: false,
      //   message: `category with id ${req.params.id} is not found`,
      // });
      throw new AppError(404,"category not found");
    }

    res.status(200).json({
      success: true,
      message: "get method using find by id",
      categorylist: cat,
    });
  } catch (error) {
    next(error)
    // res.status(404).json({
    //   success: false,
    //   message: "somthing went wrong",
    //   error,
    // });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let cat;
    cat = await category.findById(req.params.id);
    if (!cat) {
      res.status(404).json({
        success: false,
        message: `category with this id ${req.params.id} does not exist`,
      });
    }
    cat = await category.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "put method using find by id",
      categorylist: cat,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "somthing went wrong",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let del;
    del = await category.findById(req.params.id);
    if (!del) {
      res.status(404).json({
        success: false,
        message: `category with this id ${req.params.id} is not found`,
      });
    }
    await blogs.deleteMany({categoryId:req.params.id});
    del = await category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: ` data got deleted with id ${req.params.id}`,
      del
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};
