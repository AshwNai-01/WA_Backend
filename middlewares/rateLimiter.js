const { rateLimit } = require("express-rate-limit");

// Login brute-force protection: 10 failed attempts per IP every 15 minutes.
// Successful logins don't count, so a real user is never locked out by typing correctly.
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  statusCode: 429,
  message: { success: false, message: "Too many login attempts. Please try again in 15 minutes." },
});
