const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required"],
      unique: true,
      trim: true,
      maxlength: 60,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    // Carousel images on the "Perfect Places" card
    images: {
      type: [String],
      default: [],
    },
    // Shown in the "Perfect Places" section on the home page
    isPopular: {
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

citySchema.pre("validate", function () {
  // No name: skip, so the "required" validator reports it
  if (this.name && (this.isModified("name") || !this.slug)) {
    this.slug = slugify(this.name);
  }
});

module.exports = mongoose.model("City", citySchema);
