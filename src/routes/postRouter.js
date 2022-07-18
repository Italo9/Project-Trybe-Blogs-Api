const express = require('express');

const postController = require('../controllers/postController');
const { validateToken } = require('../controllers/validateToken');

const router = express.Router();

router.post('/', validateToken, postController.addPostBlog);

module.exports = router;