// Shared field rules for forms (leads, contact messages, users)

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// After removing spaces and dashes: optional +, then 10-14 digits.
// Accepts "9876543210", "+91 98765 43210" and "+14155552671".
const MOBILE_REGEX = /^\+?\d{10,14}$/;

const normalizeMobile = (value) => (typeof value === "string" ? value.replace(/[\s-]/g, "") : value);

module.exports = { EMAIL_REGEX, MOBILE_REGEX, normalizeMobile };
