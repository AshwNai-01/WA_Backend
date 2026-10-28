const mongoose = require("mongoose");
const { EMAIL_REGEX, MOBILE_REGEX, normalizeMobile } = require("../utils/validators");

const ENQUIRY_TYPES = ["bride", "groom", "business", "press"];

// A message from the Contact Us (Support) form
const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [60, "Name must be at most 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, "Please enter a valid email"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      set: normalizeMobile,
      match: [MOBILE_REGEX, "Please enter a valid mobile number"],
    },
    enquiryType: {
      type: String,
      required: [true, "Please choose who you are"],
      enum: { values: ENQUIRY_TYPES, message: "Please choose bride, groom, business or press" },
    },
    note: {
      type: String,
      required: [true, "Please tell us how we can help"],
      trim: true,
      maxlength: [1000, "Note must be at most 1000 characters"],
    },
    consent: {
      type: Boolean,
      required: [true, "Please accept the communication consent"],
      validate: {
        validator: (value) => value === true,
        message: "Please accept the communication consent",
      },
    },
    status: {
      type: String,
      enum: { values: ["new", "replied", "closed"], message: "Status must be new, replied or closed" },
      default: "new",
    },
  },
  { timestamps: true }
);

contactMessageSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
module.exports.ENQUIRY_TYPES = ENQUIRY_TYPES;
