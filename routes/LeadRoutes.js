const express = require("express");
const router = express.Router();

const { createLead, getLeads } = require("../controllers/LeadController");
const { protect, authorize } = require("../middlewares/auth");
const honeypot = require("../middlewares/honeypot");

router.post("/", honeypot, createLead);
router.get("/", protect, authorize("admin"), getLeads);

module.exports = router;
