const express = require("express");
const router = express.Router();

const { getCities, getCityBySlug, createCity } = require("../controllers/CityController");
const { protect, authorize } = require("../middlewares/auth");

router.get("/", getCities);
router.get("/:slug", getCityBySlug);
router.post("/", protect, authorize("admin"), createCity);

module.exports = router;
