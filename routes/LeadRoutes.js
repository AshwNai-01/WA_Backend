const express = require("express");
const router = express.Router();

const { createLead, getLeads, updateStatus } = require("../controllers/LeadController");
const { protect, authorize } = require("../middlewares/auth");
const honeypot = require("../middlewares/honeypot");

router.post("/", honeypot, createLead);
router.get("/", protect, authorize("admin"), getLeads);
router.patch("/:id/status", protect, authorize("admin"), updateStatus);

module.exports = router;
