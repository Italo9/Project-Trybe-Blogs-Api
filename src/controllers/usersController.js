const usersService = require('../services/usersService');

const createUser = async (req, res) => {
      await usersService.validateBody(req.body);
      const token = await usersService.createUser(req.body);
      res.status(201).json(token);
};

const getAllUsers = async (req, res) => {
    const result = await usersService.getAllUsers();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await usersService.getById(Number(id));
    return res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  const result = await usersService.deleteUser(req.user);
  return result && res.status(204).send();
};

  module.exports = {
    createUser,
    getAllUsers,
    getById,
    deleteUser,
  };