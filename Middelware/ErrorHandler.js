const ErrorHandler = async (err, req, res, next) => {
  // error has only one paramether message
  // we want statusCode and message parameter thats why we are creating out own error class that extends from main error class 
  // we are passing statusCode and message to AppError constructor
  console.log("inside error handler");

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "internal server error",
  });
};

module.exports = ErrorHandler;
