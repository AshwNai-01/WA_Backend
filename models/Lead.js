const mongoose = require("mongoose");
const { EMAIL_REGEX, MOBILE_REGEX, normalizeMobile } = require("../utils/validators");

// A "Get a Quote" enquiry from a city page or a vendor page
const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [60, "Name must be at most 60 characters"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      set: normalizeMobile,
      match: [MOBILE_REGEX, "Please enter a valid mobile number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, "Please enter a valid email"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    weddingDate: {
      type: Date,
      validate: {
        // Today or later (compared by day, so "today" is allowed)
        validator: (value) => !value || value >= new Date(new Date().setHours(0, 0, 0, 0)),
        message: "Wedding date can't be in the past",
      },
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message must be at most 1000 characters"],
    },
    consent: {
      type: Boolean,
      required: [true, "Please accept the communication consent"],
      validate: {
        validator: (value) => value === true,
        message: "Please accept the communication consent",
      },
    },
    // Where the form was sent from, e.g. "city:jaipur" or "vendor:story-makers-jaipur-4bb89"
    source: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Lead", leadSchema);
