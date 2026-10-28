const express = require("express");
const router = express.Router();

const { createMessage, getMessages, updateStatus } = require("../controllers/ContactController");
const { protect, authorize } = require("../middlewares/auth");
const honeypot = require("../middlewares/honeypot");

router.post("/", honeypot, createMessage);
router.get("/", protect, authorize("admin"), getMessages);
router.patch("/:id/status", protect, authorize("admin"), updateStatus);

module.exports = router;
