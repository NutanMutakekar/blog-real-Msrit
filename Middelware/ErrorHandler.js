const ErrorHandler = async (err, req, res, next) => {
  console.log("inside error handler");

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "internal server error",
  });
};

module.exports = ErrorHandler;
