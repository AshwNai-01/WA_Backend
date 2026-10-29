const VendorService = require("../services/VendorService");
const ApiError = require("../utils/ApiError");
const { readPagination } = require("../utils/pagination");

// GET /api/v1/vendors?city=jaipur&category=photographers&prime=true&page=1&limit=12
exports.getVendors = async (req, res) => {
  const { city, category, prime } = req.query;

  const { items, pagination } = await VendorService.getVendors({
    city,
    category,
    prime: prime === "true",
    ...readPagination(req.query, 12),
  });

  res.status(200).json({ success: true, data: items, pagination });
};

// GET /api/v1/vendors/:slug
exports.getVendorBySlug = async (req, res) => {
  const vendor = await VendorService.getVendorBySlug(req.params.slug);
  if (!vendor) throw new ApiError(404, "Vendor not found");

  res.status(200).json({ success: true, data: vendor });
};
