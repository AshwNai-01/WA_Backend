const CityService = require("../services/CityService");
const ApiError = require("../utils/ApiError");

// GET /api/v1/cities?popular=true
exports.getCities = async (req, res) => {
  const cities = await CityService.getCities({
    popular: req.query.popular === "true",
  });

  res.status(200).json({ success: true, count: cities.length, data: cities });
};

// GET /api/v1/cities/:slug
exports.getCityBySlug = async (req, res) => {
  const city = await CityService.getCityBySlug(req.params.slug);
  if (!city) throw new ApiError(404, "City not found");

  res.status(200).json({ success: true, data: city });
};

// POST /api/v1/cities (admin only)
exports.createCity = async (req, res) => {
  const city = await CityService.createCity(req.body);

  res.status(201).json({ success: true, data: city });
};
