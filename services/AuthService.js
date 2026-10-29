const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// New accounts are always "user"; admins come from the seed script
exports.register = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password });
  return { user, token: signToken(user) };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

  // Same message for wrong email and wrong password, so emails can't be guessed
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return { user, token: signToken(user) };
};
