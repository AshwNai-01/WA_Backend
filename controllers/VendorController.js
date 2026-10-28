const VendorService = require("../services/VendorService");

// GET /api/v1/vendors?city=jaipur&category=photographers&prime=true&page=1&limit=12
exports.getVendors = async (req, res) => {
  const { city, category, prime, page, limit } = req.query;

  const result = await VendorService.getVendors({
    city: city?.toLowerCase().trim(),
    category: category?.toLowerCase().trim(),
    prime: prime === "true",
    page: Number(page) || 1,
    limit: Number(limit) || 12,
  });

  res.status(200).json({
    success: true,
    data: result.vendors,
    pagination: {
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    },
  });
};

// GET /api/v1/vendors/:slug
exports.getVendorBySlug = async (req, res) => {
  const vendor = await VendorService.getVendorBySlug(req.params.slug);

  if (!vendor) {
    return res.status(404).json({ success: false, message: "Vendor not found" });
  }

  res.status(200).json({ success: true, data: vendor });
};