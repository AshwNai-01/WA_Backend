const mongoose = require("mongoose");
const slugPlugin = require("./plugins/slugPlugin");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: 60,
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

categorySchema.plugin(slugPlugin);

module.exports = mongoose.model("Category", categorySchema);
