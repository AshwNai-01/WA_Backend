const AuthService = require("../services/AuthService");
const ApiError = require("../utils/ApiError");

// POST /api/v1/auth/register
exports.register = async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const { user, token } = await AuthService.register({ name, email, password });

  res.status(201).json({ success: true, token, data: user });
};

// POST /api/v1/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const { user, token } = await AuthService.login({ email, password });

  res.status(200).json({ success: true, token, data: user });
};

// GET /api/v1/auth/me (logged-in user)
exports.getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};
