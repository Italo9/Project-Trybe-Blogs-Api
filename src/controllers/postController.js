const postService = require('../services/postService');

const addPostBlog = async (req, res) => {
      await postService.validateBody(req.body);

      const addPost = await postService.addPostBlog(req.body, req.user);
      
      res.status(201).json(addPost);
};

const getAllBlogPost = async (req, res) => {
  const getAll = await postService.getAllBlogPost();
  
  res.status(200).json(getAll);
};

const getById = async (req, res) => {
  const { id } = req.params;
    const result = await postService.getById(Number(id));
    return res.status(200).json(result);
};
 
  module.exports = {
    addPostBlog,
    getAllBlogPost,
    getById,
  };