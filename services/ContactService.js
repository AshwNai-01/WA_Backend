const ContactMessage = require("../models/ContactMessage");
const ApiError = require("../utils/ApiError");
const { findPage } = require("../utils/pagination");

// Only these fields come from the client
exports.createMessage = async ({ name, email, mobile, enquiryType, note, consent }) => {
  return ContactMessage.create({
    name,
    email,
    mobile,
    enquiryType,
    note,
    consent: consent === true || consent === "true",
  });
};

// Admin: change a message's status (new / replied / closed)
exports.updateStatus = async (id, status) => {
  const message = await ContactMessage.findByIdAndUpdate(
    id,
    { status },
    { returnDocument: "after", runValidators: true }
  ).lean();
  if (!message) throw new ApiError(404, "Message not found");
  return message;
};

// Admin list, newest first
exports.getMessages = async ({ status, page, limit }) => {
  return findPage(ContactMessage, status ? { status } : {}, {
    page,
    limit,
    sort: { createdAt: -1, _id: -1 },
  });
};
