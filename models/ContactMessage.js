const mongoose = require("mongoose");
const contactFields = require("./fields/contactFields");

const ENQUIRY_TYPES = ["bride", "groom", "business", "press"];
const MESSAGE_STATUSES = ["new", "replied", "closed"];

// A message from the Contact Us (Support) form
const contactMessageSchema = new mongoose.Schema(
  {
    ...contactFields, // name, email, mobile, consent
    enquiryType: {
      type: String,
      required: [true, "Please choose who you are"],
      lowercase: true,
      enum: { values: ENQUIRY_TYPES, message: "Please choose bride, groom, business or press" },
    },
    note: {
      type: String,
      required: [true, "Please tell us how we can help"],
      trim: true,
      maxlength: [1000, "Note must be at most 1000 characters"],
    },
    status: {
      type: String,
      enum: { values: MESSAGE_STATUSES, message: "Status must be new, replied or closed" },
      default: "new",
    },
  },
  { timestamps: true }
);

contactMessageSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
module.exports.ENQUIRY_TYPES = ENQUIRY_TYPES;
module.exports.MESSAGE_STATUSES = MESSAGE_STATUSES;
