const { EMAIL_REGEX, MOBILE_REGEX, normalizeMobile } = require("../../utils/validators");

// Fields every public form has (Get a Quote, Contact Us), with the same rules everywhere.
//   new mongoose.Schema({ ...contactFields, note: {...} })
module.exports = {
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
  // The "I agree to receive quotes..." checkbox must be ticked
  consent: {
    type: Boolean,
    required: [true, "Please accept the communication consent"],
    validate: {
      validator: (value) => value === true,
      message: "Please accept the communication consent",
    },
  },
};
