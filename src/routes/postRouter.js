const express = require('express');

const postController = require('../controllers/postController');
const { validateToken } = require('../controllers/validateToken');

const router = express.Router();

router.get('/', validateToken, postController.getAllBlogPost);
router.get('/search/', validateToken, postController.searchPost);
router.get('/:id', validateToken, postController.getById);
router.put('/:id', validateToken, postController.update);
router.delete('/:id', validateToken, postController.deletePost);
router.post('/', validateToken, postController.addPostBlog);

module.exports = router;