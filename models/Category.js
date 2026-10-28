const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: 60,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    // Shown in the "Top Wedding Vendors" section on the home page
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre("validate", function () {
  // No name: skip, so the "required" validator reports it
  if (this.name && (this.isModified("name") || !this.slug)) {
    this.slug = slugify(this.name);
  }
});

module.exports = mongoose.model("Category", categorySchema);
