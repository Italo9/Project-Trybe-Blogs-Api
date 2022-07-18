const postService = require('../services/postService');

const addPostBlog = async (req, res) => {
      await postService.validateBody(req.body);

      const addPost = await postService.addPostBlog(req.body, req.user);
      
      res.status(201).json(addPost);
};
  
  module.exports = {
    addPostBlog,
  };