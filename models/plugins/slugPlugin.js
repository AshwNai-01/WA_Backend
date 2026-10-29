const slugify = require("../../utils/slugify");

// Adds a `slug` field built from `name`: "Mount Abu" -> "mount-abu".
//   citySchema.plugin(slugPlugin);
//   vendorSchema.plugin(slugPlugin, { withIdSuffix: true });
// withIdSuffix: for names that can repeat (two vendors called "Rekha"),
// adds the last 5 characters of the _id, e.g. "rekha-4bb89".
module.exports = function slugPlugin(schema, { withIdSuffix = false } = {}) {
  schema.add({
    slug: { type: String, unique: true, lowercase: true },
  });

  schema.pre("validate", function () {
    // No name: skip, so the "required" validator reports it
    if (!this.name || (!this.isModified("name") && this.slug)) return;

    const base = slugify(this.name);
    this.slug = withIdSuffix ? `${base}-${this._id.toString().slice(-5)}` : base;
  });
};
