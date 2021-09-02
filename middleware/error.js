const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  // Log to Console for developer
  console.log(err.stack.red);

  //   Mongoose Bad Object ID
  if (err.name === "CastError") {
    const message = `Resource Not Found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = `Duplicate Resource Entered`;
    error = new ErrorResponse(message, 400);
  }

  //   Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(item => item.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;