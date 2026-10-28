const ContactService = require("../services/ContactService");
const ApiError = require("../utils/ApiError");

// POST /api/v1/contact (public Contact Us form)
exports.createMessage = async (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    throw new ApiError(400, "Request body is required");
  }

  const message = await ContactService.createMessage(req.body);

  res.status(201).json({
    success: true,
    message: "Thanks for reaching out! Our team will contact you soon.",
    data: { id: message._id },
  });
};

// PATCH /api/v1/contact/:id/status  { status: "replied" } (admin only)
exports.updateStatus = async (req, res) => {
  const status = req.body?.status;
  if (!status) throw new ApiError(400, "Status is required");

  const message = await ContactService.updateStatus(req.params.id, status);
  res.status(200).json({ success: true, data: message });
};

// GET /api/v1/contact?status=new&page=1 (admin only)
exports.getMessages = async (req, res) => {
  const { status, page, limit } = req.query;
  const result = await ContactService.getMessages({
    status,
    page: Number(page) || 1,
    limit: Number(limit) || 20,
  });

  res.status(200).json({
    success: true,
    data: result.messages,
    pagination: { total: result.total, page: result.page, totalPages: result.totalPages },
  });
};
