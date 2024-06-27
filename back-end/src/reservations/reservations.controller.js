const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query.date;
  const data = await (service.list(date));
  res.json({ data });
}


async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create)
};
