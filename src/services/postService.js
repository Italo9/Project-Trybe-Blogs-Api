const Joi = require('joi');
const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { getAllUsers } = require('./usersService');
const { getAllCategory } = require('./categoryService');

const { BlogPost, Category, PostCategory } = require('../database/models/index');

const validateBody = (data) => {
    const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.required(),
  }).messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
});
  const { title, content, categoryIds } = data;
  const { error, value } = schema.validate({ title, content, categoryIds });
  if (error) {
    const customError = { name: 'BAD_REQUEST', message: error.details[0].message };
    throw customError;
  } 
  return value;
};

const validateBodyUpdate = (data) => {
  const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});
const { title, content } = data;
const { error, value } = schema.validate({ title, content });
if (error) {
  const customError = { name: 'BAD_REQUEST', message: error.details[0].message };
  throw customError;
} 
return value;
};

const auxiliaryCheck = async (categoryIds) => {
  const checks = await Promise.all(categoryIds
    .map((elementoId) => Category.findOne({ where: { id: elementoId } })));
    return checks;
};

const auxiliaryPost = async (title, content, userId, t) => {
  const newPost = await BlogPost.create( 
    { title, content, userId },
    );
    await t.commit();
    return newPost;
};

const addPostBlog = async ({ title, content, categoryIds }, reqUser) => {
    const t = await sequelize.transaction();
    const { id } = reqUser;
        const checkCategory = await auxiliaryCheck(categoryIds);
        const categoryWithoutError = checkCategory.map((ele) => {
          if (!ele) {
            const e = new Error('"categoryIds" not found');
            e.name = 'BAD_REQUEST';
            throw e;
          }
          return ele;
        });
       const createPost = await auxiliaryPost(title, content, id, t);
       Promise.all(categoryWithoutError.map(async (ele) => PostCategory.create({
            postId: createPost.id,
            categoryId: ele.dataValues.id,
          })));
        return createPost;
  };

  const getAllBlogPost = async () => {
    const resultBlogPost = await BlogPost.findAll();
    const resultCategory = await getAllCategory();
    const resultUser = await getAllUsers();
    const result = resultBlogPost.map((ele) => {
      const { id, title, content, userId, published, updated } = ele;
      const mesclaInfo = {
          id,
          title,
          content,
          userId,
          published,
          updated,
          user: resultUser.find((e) => e.id === userId),
          categories: [resultCategory.find((e) => e.id === id)],
        };
      return mesclaInfo;
    });
    return result;
};

const getById = async (idParams) => {
  const resultpostId = await BlogPost.findOne({ where: { id: idParams } });
  if (!resultpostId) {
    const e = new Error('Post does not exist');
    e.name = 'NOT_FOUND';
    throw e;
  }
  const resultCategory = await getAllCategory();
  const resultUser = await getAllUsers();
  const { id, title, content, userId, published, updated } = resultpostId;
  const mesclaInfo = { id,
    title,
    content,
    userId,
    published,
    updated,
    user: resultUser.find((e) => e.id === userId),
    categories: [resultCategory.find((e) => e.id === id)],
  }; return mesclaInfo;
};

const assistantUpdate = async ({ id, title, content, userId, published, updated }) => {
  const resultCategory = await getAllCategory();
  const resultUser = await getAllUsers();
  const mesclaInfo = { 
    id,
    title,
    content,
    userId,
    published,
    updated,
    user: resultUser.find((e) => e.id === userId),
    categories: resultCategory,
  }; return mesclaInfo;
};

const update = async (id, { title, content }, reqUser) => {
  const resultpostId = await BlogPost.findOne({ where: { id } });
  const { id: idUser } = reqUser;
  if (resultpostId.userId !== idUser) {
    const e = new Error('Unauthorized user');
    e.name = 'UNAUTHORIZED';
    throw e;
  }
  resultpostId.set({
    title,
    content,
  });
  await resultpostId.save();
  return assistantUpdate(resultpostId);
};

const deletePost = async (id, reqUser) => {
  const { id: idUser } = reqUser;
  const resultpostId = await BlogPost.findOne({ where: { id } });
  if (!resultpostId) {
    const e = new Error('Post does not exist');
    e.name = 'NOT_FOUND';
    throw e;
  }
  if (resultpostId.dataValues.userId !== idUser) {
    const e = new Error('Unauthorized user');
    e.name = 'UNAUTHORIZED';
    throw e;
  }
   await BlogPost.destroy({
    where: {
      id,
    },
  });
  return true;
};

module.exports = {
    validateBody,
    addPostBlog,
    getAllBlogPost,
    getById,
    validateBodyUpdate,
    update,
    deletePost,
  };