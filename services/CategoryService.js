const Category = require("../models/Category");

exports.getCategories = async ({ featured }) => {
  const filter = { isActive: true };
  if (featured) filter.isFeatured = true;

  return Category.find(filter).select("-__v").sort({ name: 1 }).lean();
};

exports.getCategoryBySlug = async (slug) => {
  return Category.findOne({ slug, isActive: true }).select("-__v").lean();
};

exports.createCategory = async ({ name, image, description, isFeatured }) => {
  return Category.create({ name, image, description, isFeatured });
};
