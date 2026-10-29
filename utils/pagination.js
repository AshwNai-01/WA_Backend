// Paged lists shared by vendors, leads and contact messages.

const MAX_LIMIT = 50;

// ?page=2&limit=10 -> { page: 2, limit: 10 }. Bad or missing values fall back
// to page 1 and defaultLimit; limit is kept between 1 and MAX_LIMIT.
const readPagination = (query, defaultLimit = 20) => ({
  page: Math.max(Number(query.page) || 1, 1),
  limit: Math.min(Math.max(Number(query.limit) || defaultLimit, 1), MAX_LIMIT),
});

// One page of Model.find(filter) plus the total count, run together.
//   populate: e.g. [{ path: "city", select: "name slug" }]
// Returns { items, pagination: { total, page, totalPages } }.
const findPage = async (Model, filter, { page, limit, sort, populate = [] }) => {
  const [items, total] = await Promise.all([
    Model.find(filter)
      .populate(populate)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Model.countDocuments(filter),
  ]);

  return { items, pagination: { total, page, totalPages: Math.ceil(total / limit) } };
};

// For filters that can't match anything (e.g. an unknown city slug)
const emptyPage = () => ({ items: [], pagination: { total: 0, page: 1, totalPages: 0 } });

module.exports = { readPagination, findPage, emptyPage };
