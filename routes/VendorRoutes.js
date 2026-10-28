const express = require("express");
const router = express.Router();

const { getVendors, getVendorBySlug } = require("../controllers/VendorController");

router.get("/", getVendors);
router.get("/:slug", getVendorBySlug);

module.exports = router;