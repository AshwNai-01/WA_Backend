const mongoose = require("mongoose");
const slugPlugin = require("./plugins/slugPlugin");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required"],
      unique: true,
      trim: true,
      maxlength: 60,
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

citySchema.plugin(slugPlugin);

module.exports = mongoose.model("City", citySchema);
