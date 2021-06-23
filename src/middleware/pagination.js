const paginate = (model) => {
  return async (req, res, next) => {
    const userId = req.userId;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const countElements = await model.countDocuments({ userId: userId });
    if (endIndex < countElements) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    try {
      results.results = await model.find({ userId: userId }).limit(limit).skip(startIndex);
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
};

module.exports = paginate;
