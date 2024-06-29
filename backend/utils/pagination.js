const paginate = async (model, query, options = {}) => {
    const { page = 1, limit = 10, populateOptions = null } = options;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
  
    const skip = (pageNumber - 1) * limitNumber;
    const findQuery = model.find(query).skip(skip).limit(limitNumber);
  
    if (populateOptions) {
      findQuery.populate(populateOptions);
    }
  
    const results = await findQuery.exec();
    const totalCount = await model.countDocuments(query);
  
    return {
      results,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNumber),
      currentPage: pageNumber,
    };
  };
  
  module.exports = paginate;
  