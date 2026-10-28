const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vendor name is required"],
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: [true, "City is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    // Display labels, e.g. ["20K-30K", "30K-50K"]
    priceRanges: {
      type: [String],
      default: [],
    },
    // Lowest price in rupees, used for "From ₹..." and sorting
    startingPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    isPrime: {
      type: Boolean,
      default: false,
    },
    videoMeeting: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Vendor names can repeat (e.g. two "Rekha"), so add a short suffix
vendorSchema.pre("validate", function () {
  if (this.name && (this.isModified("name") || !this.slug)) {
    const suffix = this._id.toString().slice(-5);
    this.slug = `${slugify(this.name)}-${suffix}`;
  }
});

// Speeds up the home page filters
vendorSchema.index({ city: 1, category: 1, isPrime: -1 });

module.exports = mongoose.model("Vendor", vendorSchema);