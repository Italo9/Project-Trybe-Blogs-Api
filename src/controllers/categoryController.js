const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
      await categoryService.validateBody(req.body);
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
};

  module.exports = {
    createCategory,
  };