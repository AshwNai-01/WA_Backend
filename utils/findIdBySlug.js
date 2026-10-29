// Turns a slug from the URL or a form ("jaipur") into that document's _id.
// Returns null when the slug is empty or nothing has it.
const findIdBySlug = async (Model, slug) => {
  if (!slug) return null;
  const doc = await Model.findOne({ slug: String(slug).toLowerCase().trim() }).select("_id").lean();
  return doc ? doc._id : null;
};

module.exports = findIdBySlug;
