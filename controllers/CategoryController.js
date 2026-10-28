const CategoryService = require("../services/CategoryService");
const ApiError = require("../utils/ApiError");

// GET /api/v1/categories?featured=true
exports.getCategories = async (req, res) => {
  const categories = await CategoryService.getCategories({
    featured: req.query.featured === "true",
  });

  res.status(200).json({ success: true, count: categories.length, data: categories });
};

// GET /api/v1/categories/:slug
exports.getCategoryBySlug = async (req, res) => {
  const category = await CategoryService.getCategoryBySlug(req.params.slug);
  if (!category) throw new ApiError(404, "Category not found");

  res.status(200).json({ success: true, data: category });
};

// POST /api/v1/categories (admin only)
exports.createCategory = async (req, res) => {
  const category = await CategoryService.createCategory(req.body);

  res.status(201).json({ success: true, data: category });
};
