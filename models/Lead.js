const mongoose = require("mongoose");
const contactFields = require("./fields/contactFields");

const LEAD_STATUSES = ["new", "contacted", "closed"];

// A "Get a Quote" enquiry from a city page or a vendor page
const leadSchema = new mongoose.Schema(
  {
    ...contactFields, // name, email, mobile, consent
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
    // Where the form was sent from, e.g. "city:jaipur" or "vendor:story-makers-jaipur-4bb89"
    source: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    status: {
      type: String,
      enum: { values: LEAD_STATUSES, message: "Status must be new, contacted or closed" },
      default: "new",
    },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Lead", leadSchema);
module.exports.LEAD_STATUSES = LEAD_STATUSES;
