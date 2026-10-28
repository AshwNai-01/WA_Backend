const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

// Requires "Authorization: Bearer <token>" and attaches req.user
exports.protect = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) {
    throw new ApiError(401, "Not logged in");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // User may have been deleted after the token was issued
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  req.user = user;
  next();
};

// Use after protect, e.g. authorize("admin")
exports.authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to do this");
    }
    next();
  };
