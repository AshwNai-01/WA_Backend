const ApiError = require("../utils/ApiError");

// Any request that didn't match a route
module.exports = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};
