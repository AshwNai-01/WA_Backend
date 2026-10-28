const City = require("../models/City");

exports.getCities = async ({ popular }) => {
  const filter = { isActive: true };
  if (popular) filter.isPopular = true;

  return City.find(filter).select("-__v").sort({ name: 1 }).lean();
};

exports.getCityBySlug = async (slug) => {
  return City.findOne({ slug, isActive: true }).select("-__v").lean();
};

exports.createCity = async ({ name, description, images, isPopular }) => {
  return City.create({ name, description, images, isPopular });
};
