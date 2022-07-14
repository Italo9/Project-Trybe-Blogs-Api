const express = require('express');

const usersController = require('../controllers/usersController');
const { validateToken } = require('../controllers/validateToken');

const router = express.Router();

router.get('/', validateToken, usersController.getAllUsers);
router.post('/', usersController.createUser);

module.exports = router;