const LeadService = require("../services/LeadService");
const ApiError = require("../utils/ApiError");
const { readPagination } = require("../utils/pagination");

// POST /api/v1/leads (public "Get a Quote" form)
exports.createLead = async (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    throw new ApiError(400, "Request body is required");
  }

  const lead = await LeadService.createLead(req.body);

  // Only confirm receipt; don't echo the stored record back to the public
  res.status(201).json({
    success: true,
    message: "Thanks! We'll get back to you shortly.",
    data: { id: lead._id },
  });
};

// GET /api/v1/leads?status=new&page=1 (admin only)
exports.getLeads = async (req, res) => {
  const { items, pagination } = await LeadService.getLeads({
    status: req.query.status,
    ...readPagination(req.query),
  });

  res.status(200).json({ success: true, data: items, pagination });
};

// PATCH /api/v1/leads/:id/status  { status: "contacted" } (admin only)
exports.updateStatus = async (req, res) => {
  const status = req.body?.status;
  if (!status) throw new ApiError(400, "Status is required");

  const lead = await LeadService.updateStatus(req.params.id, status);
  res.status(200).json({ success: true, data: lead });
};
