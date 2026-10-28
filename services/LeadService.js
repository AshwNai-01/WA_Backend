const Lead = require("../models/Lead");
const Category = require("../models/Category");
const City = require("../models/City");
const Vendor = require("../models/Vendor");
const ApiError = require("../utils/ApiError");

const MAX_LIMIT = 50;

// The form sends slugs ("caterers", "jaipur"); store ids. Unknown slug -> 400.
const idForSlug = async (Model, slug, label) => {
  if (!slug) return undefined;
  const doc = await Model.findOne({ slug: String(slug).toLowerCase().trim() }).select("_id").lean();
  if (!doc) throw new ApiError(400, `Unknown ${label}: ${slug}`);
  return doc._id;
};

// Only these fields come from the client; status etc. are never taken from the body
exports.createLead = async ({ name, mobile, email, category, city, vendor, weddingDate, message, consent, source }) => {
  const [categoryId, cityId, vendorId] = await Promise.all([
    idForSlug(Category, category, "category"),
    idForSlug(City, city, "city"),
    idForSlug(Vendor, vendor, "vendor"),
  ]);

  return Lead.create({
    name,
    mobile,
    email,
    category: categoryId,
    city: cityId,
    vendor: vendorId,
    weddingDate: weddingDate || undefined,
    message,
    consent: consent === true || consent === "true",
    source,
  });
};

// Admin list, newest first
exports.getLeads = async ({ status, page = 1, limit = 20 }) => {
  const filter = status ? { status } : {};
  const safeLimit = Math.min(Math.max(limit, 1), MAX_LIMIT);
  const safePage = Math.max(page, 1);

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .populate("category", "name slug")
      .populate("city", "name slug")
      .populate("vendor", "name slug")
      .sort({ createdAt: -1, _id: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .lean(),
    Lead.countDocuments(filter),
  ]);

  return { leads, total, page: safePage, totalPages: Math.ceil(total / safeLimit) };
};
