const express = require("express");
const router = express.Router();

const { getCategories, getCategoryBySlug, createCategory } = require("../controllers/CategoryController");
const { protect, authorize } = require("../middlewares/auth");

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);
router.post("/", protect, authorize("admin"), createCategory);

module.exports = router;
