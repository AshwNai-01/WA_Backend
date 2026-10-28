const mongoose = require("mongoose");
const Vendor = require("../models/Vendor");

const MAX_LIMIT = 50;

// Turns a slug like "jaipur" into the City/Category _id
const findIdBySlug = async (modelName, slug) => {
  const doc = await mongoose.model(modelName).findOne({ slug }).select("_id").lean();
  return doc ? doc._id : null;
};

exports.getVendors = async ({ city, category, prime, page = 1, limit = 12 }) => {
  const filter = { isActive: true };

  if (city) {
    const cityId = await findIdBySlug("City", city);
    if (!cityId) return { vendors: [], total: 0, page: 1, totalPages: 0 };
    filter.city = cityId;
  }

  if (category) {
    const categoryId = await findIdBySlug("Category", category);
    if (!categoryId) return { vendors: [], total: 0, page: 1, totalPages: 0 };
    filter.category = categoryId;
  }

  if (prime) filter.isPrime = true;

  const safeLimit = Math.min(Math.max(limit, 1), MAX_LIMIT);
  const safePage = Math.max(page, 1);
  const skip = (safePage - 1) * safeLimit;

  const [vendors, total] = await Promise.all([
    Vendor.find(filter)
      .populate("category", "name slug")
      .populate("city", "name slug")
      // _id breaks ties so pages stay stable
      .sort({ isPrime: -1, createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(safeLimit)
      .lean(),
    Vendor.countDocuments(filter),
  ]);

  return {
    vendors,
    total,
    page: safePage,
    totalPages: Math.ceil(total / safeLimit),
  };
};

exports.getVendorBySlug = async (slug) => {
  return Vendor.findOne({ slug, isActive: true })
    .populate("category", "name slug")
    .populate("city", "name slug")
    .lean();
};