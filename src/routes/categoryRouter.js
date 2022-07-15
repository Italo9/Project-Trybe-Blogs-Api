const express = require('express');

const categoryController = require('../controllers/categoryController');
const { validateToken } = require('../controllers/validateToken');

const router = express.Router();

router.get('/', validateToken, categoryController.getAllCategory);
router.post('/', validateToken, categoryController.createCategory);

module.exports = router;