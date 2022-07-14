const usersService = require('../services/usersService');

const createUser = async (req, res) => {
      await usersService.validateBody(req.body);
      const token = await usersService.createUser(req.body);
      res.status(201).json(token);
};
  
  module.exports = {
    createUser,
  };