const Vendor = require("../models/Vendor");
const City = require("../models/City");
const Category = require("../models/Category");
const findIdBySlug = require("../utils/findIdBySlug");
const { findPage, emptyPage } = require("../utils/pagination");

// Vendors are always shown with their category and city names
const POPULATE = [
  { path: "category", select: "name slug" },
  { path: "city", select: "name slug" },
];

// Filters by city/category slug; an unknown slug simply finds no vendors
exports.getVendors = async ({ city, category, prime, page, limit }) => {
  const filter = { isActive: true };

  if (city) {
    filter.city = await findIdBySlug(City, city);
    if (!filter.city) return emptyPage();
  }

  if (category) {
    filter.category = await findIdBySlug(Category, category);
    if (!filter.category) return emptyPage();
  }

  if (prime) filter.isPrime = true;

  return findPage(Vendor, filter, {
    page,
    limit,
    populate: POPULATE,
    // Prime first, then newest; _id breaks ties so pages stay stable
    sort: { isPrime: -1, createdAt: -1, _id: -1 },
  });
};

exports.getVendorBySlug = async (slug) => {
  return Vendor.findOne({ slug, isActive: true }).populate(POPULATE).lean();
};
