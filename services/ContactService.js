const ContactMessage = require("../models/ContactMessage");
const ApiError = require("../utils/ApiError");

const MAX_LIMIT = 50;

// Only these fields come from the client
exports.createMessage = async ({ name, email, mobile, enquiryType, note, consent }) => {
  return ContactMessage.create({
    name,
    email,
    mobile,
    enquiryType: typeof enquiryType === "string" ? enquiryType.toLowerCase() : enquiryType,
    note,
    consent: consent === true || consent === "true",
  });
};

// Admin: change a message's status (new / replied / closed)
exports.updateStatus = async (id, status) => {
  const message = await ContactMessage.findByIdAndUpdate(id, { status }, { returnDocument: "after", runValidators: true }).lean();
  if (!message) throw new ApiError(404, "Message not found");
  return message;
};

// Admin list, newest first
exports.getMessages = async ({ status, page = 1, limit = 20 }) => {
  const filter = status ? { status } : {};
  const safeLimit = Math.min(Math.max(limit, 1), MAX_LIMIT);
  const safePage = Math.max(page, 1);

  const [messages, total] = await Promise.all([
    ContactMessage.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .lean(),
    ContactMessage.countDocuments(filter),
  ]);

  return { messages, total, page: safePage, totalPages: Math.ceil(total / safeLimit) };
};
