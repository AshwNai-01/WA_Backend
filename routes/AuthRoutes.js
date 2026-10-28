const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/AuthController");
const { protect } = require("../middlewares/auth");
const { loginLimiter } = require("../middlewares/rateLimiter");

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", protect, getMe);

module.exports = router;
