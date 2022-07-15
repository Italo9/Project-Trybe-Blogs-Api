const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
      await categoryService.validateBody(req.body);
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
};

const getAllCategory = async (req, res) => {
    const result = await categoryService.getAllCategory();
    return res.status(200).json(result);
};

  module.exports = {
    createCategory,
    getAllCategory,
  };