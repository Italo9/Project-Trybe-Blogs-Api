const express = require('express');

const postController = require('../controllers/postController');
const { validateToken } = require('../controllers/validateToken');

const router = express.Router();

router.get('/', validateToken, postController.getAllBlogPost);
router.get('/:id', validateToken, postController.getById);
router.put('/:id', validateToken, postController.update);
router.post('/', validateToken, postController.addPostBlog);

module.exports = router;