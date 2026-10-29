const Lead = require("../models/Lead");
const Category = require("../models/Category");
const City = require("../models/City");
const Vendor = require("../models/Vendor");
const ApiError = require("../utils/ApiError");
const findIdBySlug = require("../utils/findIdBySlug");
const { findPage } = require("../utils/pagination");

// Leads are always shown with category, city and vendor names
const POPULATE = [
  { path: "category", select: "name slug" },
  { path: "city", select: "name slug" },
  { path: "vendor", select: "name slug" },
];

// The form sends slugs ("caterers", "jaipur"); store ids. A slug that doesn't exist -> 400.
const requiredIdForSlug = async (Model, slug, label) => {
  if (!slug) return undefined;
  const id = await findIdBySlug(Model, slug);
  if (!id) throw new ApiError(400, `Unknown ${label}: ${slug}`);
  return id;
};

// Only these fields come from the client; status etc. are never taken from the body
exports.createLead = async ({ name, mobile, email, category, city, vendor, weddingDate, message, consent, source }) => {
  const [categoryId, cityId, vendorId] = await Promise.all([
    requiredIdForSlug(Category, category, "category"),
    requiredIdForSlug(City, city, "city"),
    requiredIdForSlug(Vendor, vendor, "vendor"),
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

// Admin: change a lead's status (new / contacted / closed)
exports.updateStatus = async (id, status) => {
  const lead = await Lead.findByIdAndUpdate(id, { status }, { returnDocument: "after", runValidators: true })
    .populate(POPULATE)
    .lean();
  if (!lead) throw new ApiError(404, "Lead not found");
  return lead;
};

// Admin list, newest first
exports.getLeads = async ({ status, page, limit }) => {
  return findPage(Lead, status ? { status } : {}, {
    page,
    limit,
    populate: POPULATE,
    sort: { createdAt: -1, _id: -1 },
  });
};
