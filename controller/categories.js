const category = require("../models/category");

const blogs = require("../models/blogsM");
const AppError = require("../AppError/AppError");
exports.createCategory = async (req, res, next) => {
  try {
    const cat = await category.create(req.body);
    res.status(201).json({
      successs: true,
      category: cat,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategory = async (req, res, next) => {
  try {
    const cat = await category.find();
    res.status(200).json({
      success: true,
      count: cat.length,
      categories: cat,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    let cat;
    cat = await category.findById(req.params.id);
    if (!cat) {
      throw new AppError(
        404,
        `category with id ${req.params.id} is not found from  get sing cat req`
      );
    }

    res.status(200).json({
      success: true,
      message: "get method using find by id",
      categorylist: cat,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    let cat;
    cat = await category.findById(req.params.id);
    if (!cat) {
      throw new AppError(
        404,
        `category with id ${req.params.id} is not found from  get update cat req`
      );
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
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    let del;
    del = await category.findById(req.params.id);
    if (!del) {
      throw new AppError(
        404,
        `category with id ${req.params.id} is not found from  get sing cat req`
      );
    }
    await blogs.deleteMany({ categoryId: req.params.id });
    del = await category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: ` data got deleted with id ${req.params.id}`,
      del,
    });
  } catch (error) {
    next(error);
  }
};
