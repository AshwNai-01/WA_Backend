const express = require("express");
const router = express.Router();

const { createMessage, getMessages } = require("../controllers/ContactController");
const { protect, authorize } = require("../middlewares/auth");
const honeypot = require("../middlewares/honeypot");

router.post("/", honeypot, createMessage);
router.get("/", protect, authorize("admin"), getMessages);

module.exports = router;
